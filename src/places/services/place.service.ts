/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/services/company.service';
import { UserService } from 'src/user/services/user.service';
import { In, Repository } from 'typeorm';
import { PlaceEntity } from '../entitites/place.entity';
import { IPlaceCreate } from '../interfaces/placeCreate.interface';
import { IPlaceDelete } from '../interfaces/placeDelete.interface';
import { IPlaceRead } from '../interfaces/placeRead.interface';
import { IPlaceUpdate } from '../interfaces/placeUpdate.interface';
import { IEditResponsible } from '../interfaces/ṕlaceIEditResponsible';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceEntity)
    private readonly placeRepository: Repository<PlaceEntity>,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  // Create
  async create(Request: IPlaceCreate): Promise<object> {
    const requestId = Request.requestId;
    const companyId = Request.company_id;
    await this.companyService.readById({
      requestId: requestId,
      company_id: companyId,
    });

    const NewPlace = Request;

    await this.placeRepository.save(NewPlace);
    return { message: 'Account ' + NewPlace.name + ' has been created!' };
  }

  // Read
  async read(Request: IPlaceRead): Promise<PlaceEntity> {
    const Place: PlaceEntity = await this.getPlaceIfExists(Request.placeId);

    const isResponsible = await this.isResponsible(
      Request.requestId,
      Place.main_responsible,
      Place.responsibles,
    );

    if (isResponsible) {
      return Place;
    } else {
      throw new HttpException(
        'You arent responsible for this Place.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // Update
  async update(Request: IPlaceUpdate): Promise<PlaceEntity> {
    const Place: PlaceEntity = await this.getPlaceIfExists(Request.placeId);

    if (
      Request.hasOwnProperty('main_responsible') ||
      Request.hasOwnProperty('responsibles')
    ) {
      throw new HttpException(
        'You are not the main responsible, so you cannot to update the responsible based fields.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isResponsible = await this.isResponsible(
      Request.requestId,
      Place.main_responsible,
      Place.responsibles,
    );

    // Checking if have something to update

    const { requestId, ...UpdateObject } = Request;
    if (Object.entries(UpdateObject).length < 2) {
      throw new HttpException(
        'Nothing field to update.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (isResponsible) {
      const PlaceUpdated = {
        ...Place,
        ...UpdateObject,
      };
      return await this.placeRepository.save(PlaceUpdated);
    } else {
      throw new HttpException(
        'You arent responsible for this Place.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // Update Responsibles
  async updateResponsibles(Request: IEditResponsible): Promise<PlaceEntity> {
    const Place: PlaceEntity = await this.getPlaceIfExists(Request.placeId);

    const userId = await this.userService.findByEmail(Request.email);

    const isResponsible = await this.isResponsible(
      Request.requestId,
      Place.main_responsible,
      Place.responsibles,
    );

    let responsibles = Place.responsibles;

    if (responsibles === null) {
      responsibles = [];
    }

    if (!responsibles.some((responsible) => responsible === userId.id)) {
      responsibles.push(userId.id);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: [
            {
              message: 'User has been a responsible.',
            },
          ],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (isResponsible) {
      const companyUpdated = {
        ...Place,
        responsibles: responsibles,
      };
      return await this.placeRepository.save(companyUpdated);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: [
            {
              message: 'To add more responsibles you need to be the Owner.',
            },
          ],
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // Delete
  async delete(Request: IPlaceDelete): Promise<PlaceEntity> {
    const PlaceToRemove = await this.placeRepository.findOne({
      id: Request.placeId,
    });

    const isResponsible = await this.isResponsible(
      Request.requestId,
      PlaceToRemove.main_responsible,
      null,
    );

    if (isResponsible) {
      return await this.placeRepository.remove(PlaceToRemove);
    } else {
      throw new HttpException(
        'You arent responsible for this Place.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getAllPlaces(
    requestId: number,
    companyId: number,
  ): Promise<PlaceEntity[]> {
    const Places: PlaceEntity[] = await this.placeRepository.find({
      select: [
        'id',
        'name',
        'cep',
        'number',
        'company_id',
        'main_responsible',
        'responsibles',
      ],
      where: {
        company_id: companyId,
        isActive: true,
      },
    });

    const filterPlace = [];
    for (const place of Places) {
      const beReturned = await this.isResponsible(
        requestId,
        place.main_responsible,
        place.responsibles,
      );

      if (beReturned == true) {
        filterPlace.push(place);
      }
    }
    if (!filterPlace || !Places || filterPlace.length <= 0) {
      throw new HttpException(
        'You have not responsible for this company places.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return filterPlace;
  }

  // Checking if the request is responsible for Place
  async isResponsible(
    requesterId: number,
    main_responsible: number,
    responsibles?: Array<number>,
  ): Promise<boolean> {
    if (main_responsible === requesterId) {
      return true;
    }

    if (responsibles != null && responsibles.length > 0) {
      for (const resposible of responsibles) {
        if (resposible === requesterId) {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  // Validate if PLACE already exists on database and the value from req
  async getPlaceIfExists(placeId: number): Promise<PlaceEntity> {
    const Place: PlaceEntity = await this.placeRepository.findOne({
      id: placeId,
      isActive: true,
    });

    if (Place == undefined) {
      throw new HttpException(
        'This place id do not exists.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return Place;
    }
  }
  // main_responsible
}
