import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyFeature } from './propertyFeature.entity';
import { User } from './user.entity';
import { PropertyType } from './propertyType.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  @OneToOne(
    () => PropertyFeature,
    (PropertyFeature) => PropertyFeature.property,
  )
  propertyFeature: PropertyFeature;

  @ManyToOne(() => User, (user) => user.properties)
  user: User;

  @ManyToMany(() => User, (user) => user.likedProperties)
  likedBy: User[];

  @ManyToOne(() => PropertyType)
  propertyType: PropertyType;
}
