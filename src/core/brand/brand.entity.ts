import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { WearEntity } from '../wear/wear.entity';

@Entity({ name: 'brand' })
export class BrandEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name!: string;

  @OneToMany(() => WearEntity, (wear: WearEntity) => wear.brandId)
  wearId: WearEntity[];
}
