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
import { UserEntity } from '../user/user.entity';
import { WearCollectionEntity } from '../wear-collection/wear-collection.entity';

@Entity({ name: 'wear' })
export class WearEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'name',
    nullable: false,
  })
  name!: string;

  @Column({
    type: 'bool',
    name: 'pinned',
    default: false,
  })
  pinned?: boolean;

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

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.wearId)
  @JoinColumn({
    name: 'user_id',
  })
  userId: UserEntity;

  @OneToMany(
    () => WearCollectionEntity,
    (wearCollection: WearCollectionEntity) => wearCollection.wearId,
    {
      cascade: true,
    },
  )
  wearCollectionId: WearCollectionEntity[];
}
