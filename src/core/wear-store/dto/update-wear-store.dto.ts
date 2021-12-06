import { IsOptional, IsString, IsNumber } from 'class-validator';

import { BrandEntity } from 'src/core/brand/brand.entity';
import { CategoryEntity } from 'src/core/category/category.entity';
import { FileUploadEntity } from 'src/core/file-upload/file-upload.entity';

export class UpdateWearStoreDto {
  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsNumber()
  price!: number;

  @IsOptional()
  @IsString()
  brandId: BrandEntity;

  @IsOptional()
  @IsString()
  categoryId: CategoryEntity;

  @IsOptional()
  @IsString()
  fileId: FileUploadEntity;
}
