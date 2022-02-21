import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ unique: true })
  cnpj?: string;

  @Column()
  description?: string;

  @Column()
  main_responsible?: number;

  @Column('int', { array: true, nullable: true })
  responsibles?: Array<number>;

  @Column('int', { array: true, nullable: true })
  places?: Array<number>;

  @Column()
  createdAt?: Date;

  @Column({ default: true })
  isActive?: boolean;
}
