import { EntityRepository, Repository } from 'typeorm';

import { WearEntity } from './wear.entity';
import { WearType } from '../category/enum/category.enum';
import { CategoryEntity } from '../category/category.entity';
import { UserEntity } from '../user/user.entity';

@EntityRepository(WearEntity)
export class WearRepository extends Repository<WearEntity> {
  async getAll(
    size: number,
    page: number,
    userId: string,
  ): Promise<WearEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('wear')
      .leftJoinAndSelect('wear.fileId', 'fileId')
      .leftJoinAndSelect('wear.categoryId', 'categoryId')
      .leftJoinAndSelect('wear.brandId', 'brandId')
      .where('wear.userId = :userId', { userId })
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async getByType(
    size: number,
    page: number,
    userId: string,
    type: WearType,
  ): Promise<WearEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    return await this.createQueryBuilder('wear')
      .leftJoinAndSelect('wear.fileId', 'fileId')
      .leftJoinAndSelect('wear.categoryId', 'categoryId')
      .leftJoinAndSelect('wear.brandId', 'brandId')
      .where('categoryId.type = :type', { type })
      .andWhere('wear.userId = :userId', { userId })
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
  ): Promise<WearEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    const findName = name || '';
    return await this.createQueryBuilder('wear')
      .leftJoinAndSelect('wear.fileId', 'fileId')
      .leftJoinAndSelect('wear.categoryId', 'categoryId')
      .leftJoinAndSelect('wear.brandId', 'brandId')
      .where('wear.userId = :userId', { userId })
      .andWhere('categoryId.id = :categoryId', { categoryId })
      .andWhere('wear.name ilike :name', { name: `%${findName}%` })
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async searchWithOutCategory(
    size: number,
    page: number,
    name: string,
    type: WearType,
    userId: string,
  ): Promise<WearEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    const findName = name || '';



    const query = this.createQueryBuilder('wear')
      .leftJoinAndSelect('wear.fileId', 'fileId')
      .leftJoinAndSelect('wear.categoryId', 'categoryId')
      .leftJoinAndSelect('wear.brandId', 'brandId')
      .where('wear.userId = :userId', { userId });

    if (type != null) {
      query.andWhere('categoryId.type = :type', { type });
    }

      
    return await query.andWhere('wear.name ilike :name', { name: `%${findName}%` })
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async searchNew(
    size: number,
    page: number,
    name: string,
    type: WearType,
    brand: string,
    userId: string,
  ): Promise<WearEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    const findName = name || '';
    const query = this.createQueryBuilder('wear')
      .leftJoinAndSelect('wear.fileId', 'fileId')
      .leftJoinAndSelect('wear.categoryId', 'categoryId')
      .leftJoinAndSelect('wear.brandId', 'brandId')
      .where('wear.userId = :userId', { userId });
    
      if (type != null) {
        query.andWhere('categoryId.type = :type', { type });
      }

      if (brand != null) {
        query.andWhere('brandId.id = :brand', { brand })
      }
      
      return await query.andWhere('wear.name ilike :name', { name: `%${findName}%` })
      .limit(take)
      .offset(skip)
      .getMany();
  }

  async getPinned(userId: string): Promise<WearEntity[]> {
    return await this.createQueryBuilder('wear')
      .leftJoinAndSelect('wear.fileId', 'fileId')
      .leftJoinAndSelect('wear.categoryId', 'categoryId')
      .leftJoinAndSelect('wear.brandId', 'brandId')
      .where('pinned = true')
      .andWhere('wear.userId = :userId', { userId })
      .getMany();
  }

  async getOne(id: string, userId?: string): Promise<WearEntity> {
    let query = this.createQueryBuilder('wear')
      .leftJoinAndSelect('wear.fileId', 'fileId')
      .leftJoinAndSelect('wear.categoryId', 'categoryId')
      .leftJoinAndSelect('wear.brandId', 'brandId')
      .where('wear.id = :id', { id });
    
    if (userId != null) {
      query = query.andWhere('wear.userId = :userId', { userId });
    }
      
    return  await query.getOne();
  }
}
