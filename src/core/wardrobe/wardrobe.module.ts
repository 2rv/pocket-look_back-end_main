import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryRepository } from '../category/category.repository';
import { WardrobeService } from './wardrobe.service';
import { WardrobeController } from './wardrobe.controller';
import { WearRepository } from '../wear/wear.repository';
import { CollectionRepository } from '../collection/collection.repository';
import { WearStoreRepository } from '../wear-store/wear-store.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WearRepository,
      WearStoreRepository,
      CollectionRepository,
      CategoryRepository,
    ]),
  ],
  providers: [WardrobeService],
  exports: [WardrobeService],
  controllers: [WardrobeController],
})
export class WardrobeModule {}
