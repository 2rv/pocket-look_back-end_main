import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

import { UserEntity } from '../core/user/user.entity';
import { UserProfileEntity } from 'src/core/user-profile-settings/user-profile-settings.entity';
import { FileUploadEntity } from './../core/file-upload/file-upload.entity';
import { BrandEntity } from 'src/core/brand/brand.entity';
import { CategoryEntity } from './../core/category/category.entity';
import { WearEntity } from 'src/core/wear/wear.entity';
import { WearStoreEntity } from 'src/core/wear-store/wear-store.entity';
import { CollectionEntity } from 'src/core/collection/collection.entity';
import { WearCollectionEntity } from 'src/core/wear-collection/wear-collection.entity';

const DATABASE_CONFIG = config.get('DATABASE');

export const ApiEntities = [
  UserEntity,
  UserProfileEntity,
  FileUploadEntity,
  BrandEntity,
  CategoryEntity,
  WearEntity,
  WearStoreEntity,
  CollectionEntity,
  WearCollectionEntity,
];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: DATABASE_CONFIG.TYPE,
  url: process.env.DATABASE_URL || DATABASE_CONFIG.URL,
  entities: ApiEntities,
  ssl: { rejectUnauthorized: false },
  logging: ['query', 'error'],
  synchronize: process.env.TYPEORM_SYNC || DATABASE_CONFIG.SYNCHRONIZE,
};
