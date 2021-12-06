import { WearEntity } from 'src/core/wear/wear.entity';
import { IsString, IsOptional } from 'class-validator';

export class CollectionDto {
  @IsOptional()
  @IsString()
  headdressId: WearEntity;

  @IsOptional()
  @IsString()
  outwearId: WearEntity;

  @IsOptional()
  @IsString()
  underwearId: WearEntity;

  @IsOptional()
  @IsString()
  shoesId: WearEntity;
}
