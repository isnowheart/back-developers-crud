import { IsDateString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('developers')
export class Developer extends BaseEntity {
  @Column('varchar', { nullable: false })
  name: string;

  @Column('char', { nullable: false})
  gender: string;

  @Column('int', { nullable: false })
  age: number;

  @Column('varchar', { nullable: false })
  hobby: string;

  @IsDateString()
  @Column('date', { nullable: false })
  birthdate: Date;
}
