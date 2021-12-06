import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WearController } from './wear.controller';
import { WearService } from './wear.service';
import { WearRepository } from './wear.repository';
import { CategoryRepository } from '../category/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository, WearRepository])],
  providers: [WearService],
  exports: [WearService],
  controllers: [WearController],
})
export class WearModule {}
