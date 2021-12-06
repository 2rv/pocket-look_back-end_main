import { EntityRepository, Repository } from 'typeorm';

import { WearStoreEntity } from './wear-store.entity';
import { WearType } from '../category/enum/category.enum';
import { CategoryEntity } from '../category/category.entity';

@EntityRepository(WearStoreEntity)
export class WearStoreRepository extends Repository<WearStoreEntity> {
  async getAll(size: number, page: number): Promise<WearStoreEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('wear_store')
      .leftJoinAndSelect('wear_store.fileId', 'fileId')
      .leftJoinAndSelect('wear_store.categoryId', 'categoryId')
      .leftJoinAndSelect('wear_store.brandId', 'brandId')
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async getByType(
    size: number,
    page: number,
    type: WearType,
  ): Promise<WearStoreEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('wear_store')
      .leftJoinAndSelect('wear_store.fileId', 'fileId')
      .leftJoinAndSelect('wear_store.categoryId', 'categoryId')
      .leftJoinAndSelect('wear_store.brandId', 'brandId')
      .where('categoryId.type = :type', { type })
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async search(
    size: number,
    page: number,
    name: string,
    categoryId: CategoryEntity,
  ): Promise<WearStoreEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    const findName = name || '';
    return await this.createQueryBuilder('wear_store')
      .leftJoinAndSelect('wear_store.fileId', 'fileId')
      .leftJoinAndSelect('wear_store.categoryId', 'categoryId')
      .leftJoinAndSelect('wear_store.brandId', 'brandId')
      .where('categoryId.id = :categoryId', { categoryId })
      .andWhere('wear_store.name ilike :name', { name: `%${findName}%` })
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async getPinned(): Promise<WearStoreEntity[]> {
    return await this.createQueryBuilder('wear_store')
      .leftJoinAndSelect('wear_store.fileId', 'fileId')
      .leftJoinAndSelect('wear_store.categoryId', 'categoryId')
      .leftJoinAndSelect('wear_store.brandId', 'brandId')
      .where('pinned = true')
      .getMany();
  }

  async getOne(id: string): Promise<WearStoreEntity> {
    return await this.createQueryBuilder('wear_store')
      .leftJoinAndSelect('wear_store.fileId', 'fileId')
      .leftJoinAndSelect('wear_store.categoryId', 'categoryId')
      .leftJoinAndSelect('wear_store.brandId', 'brandId')
      .where('wear_store.id = :id', { id })
      .getOne();
  }
}
