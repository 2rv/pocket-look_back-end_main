import { IsString, IsEnum, IsOptional } from 'class-validator';
import { WearType } from '../enum/category.enum';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(WearType)
  type: number;
}
