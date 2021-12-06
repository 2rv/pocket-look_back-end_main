import { EntityRepository, Repository } from 'typeorm';

import { WearCollectionEntity } from './wear-collection.entity';

@EntityRepository(WearCollectionEntity)
export class WearCollectionRepository extends Repository<WearCollectionEntity> {
  async getOne(id: string): Promise<WearCollectionEntity> {
    return await this.createQueryBuilder('wear_collection')
      .leftJoinAndSelect('wear_collection.collection', 'collection')
      .where('wear_collection.id = :id', { id })
      .getOne();
  }
}
