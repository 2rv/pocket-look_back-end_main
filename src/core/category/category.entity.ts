import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { WearType } from './enum/category.enum';
import { WearEntity } from '../wear/wear.entity';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name!: string;

  @Column({
    type: 'enum',
    enum: WearType,
    nullable: false,
  })
  type: WearType;

  @OneToMany(() => WearEntity, (wear: WearEntity) => wear.categoryId)
  wearId: WearEntity[];
}
