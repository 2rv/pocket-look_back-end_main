import { EntityRepository, Repository } from 'typeorm';

import { CollectionEntity } from './collection.entity';
import { CategoryEntity } from '../category/category.entity';
import { WearType } from '../category/enum/category.enum';

@EntityRepository(CollectionEntity)
export class CollectionRepository extends Repository<CollectionEntity> {
  async getAll(
    size: number,
    page: number,
    userId: string,
  ): Promise<CollectionEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('collection')
      .leftJoinAndSelect('collection.wear', 'wear')
      .leftJoinAndSelect('wear.wearId', 'wearId')
      .leftJoinAndSelect('wearId.fileId', 'fileId')
      .leftJoinAndSelect('wearId.categoryId', 'categoryId')
      .leftJoinAndSelect('wear.wearStoreId', 'wearStoreId')
      .leftJoinAndSelect('wearStoreId.fileId', 'file')
      .leftJoinAndSelect('wearStoreId.categoryId', 'category')
      .where('collection.userId = :userId', { userId })
      .orderBy('collection.pinned', 'DESC')
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async search(
    size: number,
    page: number,
    name: string,
    categoryId: CategoryEntity,
    userId: string,
  ): Promise<CollectionEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    const findName = name || '';
    return await this.createQueryBuilder('collection')
      .leftJoinAndSelect('collection.wear', 'wear')
      .leftJoinAndSelect('wear.wearId', 'wearId')
      .leftJoinAndSelect('wearId.fileId', 'fileId')
      .leftJoinAndSelect('wearId.categoryId', 'categoryId')
      .leftJoinAndSelect('wearId.brandId', 'brandId')
      .where('collection.userId = :userId', { userId })
      .andWhere('wearId.name ilike :name', { name: `%${findName}%` })
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async searchWithoutCategory(
    size: number,
    page: number,
    name: string,
    type: WearType,
    userId: string,
  ): Promise<CollectionEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    const findName = name || '';

    var request = this.createQueryBuilder('collection')
      .leftJoinAndSelect('collection.wear', 'wear')
      .leftJoinAndSelect('wear.wearId', 'wearId')
      .leftJoinAndSelect('wearId.fileId', 'fileId')
      .leftJoinAndSelect('wearId.categoryId', 'categoryId')
      .leftJoinAndSelect('wearId.brandId', 'brandId')
      .where('collection.userId = :userId', { userId })
      .andWhere('wearId.name ilike :name', { name: `%${findName}%` });

    if (type) {
      request = request.andWhere('categoryId.type = :type', { type });
    }

    return await request.limit(take).offset(skip).getMany();
  }

  async searchNew(
    size: number,
    page: number,
    name: string,
    type: WearType,
    brand: string,
    userId: string,
  ): Promise<CollectionEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    const findName = name || '';
    const query = this.createQueryBuilder('collection')
      .leftJoinAndSelect('collection.wear', 'wear')
      .leftJoinAndSelect('wear.wearId', 'wearId')
      .leftJoinAndSelect('wearId.fileId', 'fileId')
      .leftJoinAndSelect('wearId.categoryId', 'categoryId')
      .leftJoinAndSelect('wearId.brandId', 'brandId')
      .andWhere('categoryId.type = :type', { type })
      .limit(take)
      .where('collection.userId = :userId', { userId });

    if (type != null) {
      query.andWhere('categoryId.type = :type', { type });
    }

    if (brand != null) {
      query.andWhere('brandId.id = :brand', { brand });
    }

    return await query
      .andWhere('collection.name ilike :name', { name: `%${findName}%` })
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async getPinned(userId: string): Promise<CollectionEntity[]> {
    return await this.createQueryBuilder('collection')
      .leftJoinAndSelect('collection.wear', 'wear')
      .leftJoinAndSelect('wear.wearId', 'wearId')
      .leftJoinAndSelect('wearId.fileId', 'fileId')
      .leftJoinAndSelect('wearId.categoryId', 'categoryId')
      .leftJoinAndSelect('wear.wearStoreId', 'wearStoreId')
      .leftJoinAndSelect('wearStoreId.fileId', 'file')
      .leftJoinAndSelect('wearStoreId.categoryId', 'category')
      .where('collection.pinned = true')
      .andWhere('collection.userId = :userId', { userId })
      .getMany();
  }

  async getOne(id: string, userId: string): Promise<CollectionEntity> {
    return await this.createQueryBuilder('collection')
      .leftJoinAndSelect('collection.wear', 'wear')
      .leftJoinAndSelect('wear.wearId', 'wearId')
      .leftJoinAndSelect('wearId.fileId', 'fileId')
      .leftJoinAndSelect('wearId.categoryId', 'categoryId')
      .leftJoinAndSelect('wear.wearStoreId', 'wearStoreId')
      .leftJoinAndSelect('wearStoreId.fileId', 'file')
      .leftJoinAndSelect('wearStoreId.categoryId', 'category')
      .where('collection.id = :id', { id })
      .andWhere('collection.userId = :userId', { userId })
      .getOne();
  }
}
