import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cep: string;

  @Column()
  number: string;

  @Column()
  company_id: number;

  @Column()
  main_responsible: number;

  @Column('int', { array: true, nullable: true })
  responsibles: Array<number>;

  @Column()
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
