import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WearCollectionRepository } from './wear-collection.repository';
import { WearCollectionService } from './wear-collection.service';
import { WearCollectionController } from './wear-collection.controller';
import { CollectionRepository } from '../collection/collection.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([WearCollectionRepository, CollectionRepository]),
  ],
  providers: [WearCollectionService],
  exports: [WearCollectionService],
  controllers: [WearCollectionController],
})
export class WearCollectionModule {}
