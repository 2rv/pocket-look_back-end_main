import { IsString, IsOptional } from 'class-validator';

export class UpdateCollectionDto {
  @IsOptional()
  @IsString()
  pinned: boolean;
}
