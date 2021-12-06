import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { WearCollectionEntity } from './../../wear-collection/wear-collection.entity';
import { WearEntity } from './../../wear/wear.entity';

export class CreateCollectionDto {
  @ValidateNested()
  @Type(() => WearEntity)
  collection: WearEntity;

  @IsNotEmpty()
  wear: WearCollectionEntity[];
  fileUrl: string;
  name: string;
}
