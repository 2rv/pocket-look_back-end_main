import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class BrandDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
