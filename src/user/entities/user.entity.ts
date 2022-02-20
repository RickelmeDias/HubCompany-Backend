import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  cep: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
