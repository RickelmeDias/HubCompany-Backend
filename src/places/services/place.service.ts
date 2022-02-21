/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceEntity } from '../entitites/place.entity';
import { IPlaceCreate } from '../interfaces/placeCreate.interface';
import { IPlaceDelete } from '../interfaces/placeDelete.interface';
import { IPlaceRead } from '../interfaces/placeRead.interface';
import { IPlaceUpdate } from '../interfaces/placeUpdate.interface';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceEntity)
    private placeRepository: Repository<PlaceEntity>,
  ) {}

  // Create
  async create(Request: IPlaceCreate): Promise<object> {
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

  // Checking if the request is responsible for Place
  async isResponsible(
    requesterId: number,
    main_responsible: number,
    responsibles?: Array<number>,
  ): Promise<boolean> {
    if (responsibles != null && responsibles.length > 0) {
      for (const resposible of responsibles) {
        if (resposible === requesterId) {
          return true;
        }
      }
    } else if (main_responsible === requesterId) {
      return true;
    } else {
      return false;
    }
  }

  // Validate if PLACE already exists on database and the value from req
  async getPlaceIfExists(placeId: number): Promise<PlaceEntity> {
    const Place: PlaceEntity = await this.placeRepository.findOne({
      id: placeId,
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

  async getAllPlaces(companyId: number): Promise<PlaceEntity[]> {
    const Places: PlaceEntity[] = await this.placeRepository.find({
      company_id: companyId,
    });

    return Places;
  }
}
