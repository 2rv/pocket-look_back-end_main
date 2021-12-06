import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { FileUploadEntity } from 'src/core/file-upload/file-upload.entity';
import { BrandEntity } from 'src/core/brand/brand.entity';
import { CategoryEntity } from 'src/core/category/category.entity';

export class WearDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  brandId: BrandEntity;

  @IsNotEmpty()
  @IsString()
  categoryId: CategoryEntity;

  @IsNotEmpty()
  @IsString()
  fileId: FileUploadEntity;
}
