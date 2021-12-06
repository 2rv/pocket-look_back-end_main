import { IsString, IsOptional } from 'class-validator';
import { WearEntity } from './../../wear/wear.entity';

export class UpdateWearCollectionDto {
  @IsOptional()
  @IsString()
  wearId: WearEntity;
}
