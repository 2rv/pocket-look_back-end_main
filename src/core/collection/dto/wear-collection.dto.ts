import { IsString, IsNotEmpty } from 'class-validator';

import { WearCollectionEntity } from 'src/core/wear-collection/wear-collection.entity';

export class WearCollectionDto {
  @IsNotEmpty()
  wearId: WearCollectionEntity[];
}
