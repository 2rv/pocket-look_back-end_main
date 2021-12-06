import { Injectable } from '@nestjs/common';

import { WearCollectionRepository } from '../wear-collection/wear-collection.repository';
import { UpdateWearCollectionDto } from './dto/update-wear-collection.dto';
import { CollectionRepository } from '../collection/collection.repository';
import { CollectionEntity } from '../collection/collection.entity';

@Injectable()
export class WearCollectionService {
  constructor(
    private collectionRepository: CollectionRepository,
    private wearCollectionRepository: WearCollectionRepository,
  ) {}

  async update(
    id: string,
    body: UpdateWearCollectionDto,
    userId: string,
    collectionId: string,
  ): Promise<any> {
    await this.wearCollectionRepository.update(id, body);
    return await this.collectionRepository.getOne(collectionId, userId);
  }

  async delete(id: string) {
    return await this.wearCollectionRepository.delete(id);
  }
}
