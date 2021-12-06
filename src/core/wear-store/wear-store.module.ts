import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WearController } from './wear-store.controller';
import { WearStoreService } from './wear-store.service';
import { WearStoreRepository } from './wear-store.repository';
import { CategoryRepository } from './../category/category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRepository, WearStoreRepository]),
  ],
  providers: [WearStoreService],
  exports: [WearStoreService],
  controllers: [WearController],
})
export class WearStoreModule {}
