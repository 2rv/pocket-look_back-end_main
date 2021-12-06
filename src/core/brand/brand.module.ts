import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandRepository } from './brand.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BrandRepository])],
  providers: [BrandService],
  exports: [BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
