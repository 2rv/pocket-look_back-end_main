import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

import { FileUploadEntity } from 'src/core/file-upload/file-upload.entity';
import { BrandEntity } from 'src/core/brand/brand.entity';
import { CategoryEntity } from 'src/core/category/category.entity';

export class WearStoreDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @IsNotEmpty()
  @IsString()
  brandId: BrandEntity;

  @IsNotEmpty()
  @IsString()
  categoryId: CategoryEntity;

  @IsNotEmpty()
  @IsString()
  fileId: FileUploadEntity;
}
