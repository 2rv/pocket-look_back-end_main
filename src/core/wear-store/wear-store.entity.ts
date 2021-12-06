import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { BrandEntity } from '../brand/brand.entity';
import { CategoryEntity } from '../category/category.entity';
import { WearCollectionEntity } from '../wear-collection/wear-collection.entity';

@Entity({ name: 'wear_store' })
export class WearStoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name!: string;

  @Column({
    type: 'bool',
    name: 'pinned',
    default: false,
  })
  pinned?: boolean;

  @Column({
    type: 'int',
    name: 'price',
  })
  price!: number;

  @ManyToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.wearId,
  )
  @JoinColumn({
    name: 'category_id',
  })
  categoryId: CategoryEntity;

  @ManyToOne(() => BrandEntity, (brand: BrandEntity) => brand.wearId)
  @JoinColumn({
    name: 'brand_id',
  })
  brandId: BrandEntity;

  @ManyToOne(() => FileUploadEntity, (file: FileUploadEntity) => file.wearId)
  @JoinColumn({
    name: 'file_id',
  })
  fileId: FileUploadEntity;

  @OneToMany(
    () => WearCollectionEntity,
    (wearCollection: WearCollectionEntity) => wearCollection.wearId,
    {
      cascade: true,
    },
  )
  wearCollectionId: WearCollectionEntity[];
}
