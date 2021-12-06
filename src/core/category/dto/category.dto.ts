import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { WearType } from '../enum/category.enum';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(WearType)
  type: number;
}
