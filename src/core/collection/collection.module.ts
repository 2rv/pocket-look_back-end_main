import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CollectionRepository } from './collection.repository';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { WearCollectionRepository } from '../wear-collection/wear-collection.repository';
import { CategoryRepository } from '../category/category.repository';
import { WearService } from '../wear/wear.service';
import { WearRepository } from '../wear/wear.repository';
import { WearController } from '../wear/wear.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryRepository,
      WearCollectionRepository,
      CollectionRepository,
      WearRepository,
    ]),
  ],
  providers: [WearService, CollectionService],
  exports: [WearService, CollectionService],
  controllers: [WearController, CollectionController],
})
export class CollectionModule {}
