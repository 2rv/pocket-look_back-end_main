import { Injectable } from '@nestjs/common';

import { WearRepository } from './wear.repository';
import { WearEntity } from './wear.entity';
import { WearDto } from './dto/wear.dto';
import { UpdateWearDto } from './dto/update-wear.dto';
import { WearType } from '../category/enum/category.enum';
import { CategoryEntity } from '../category/category.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class WearService {
  constructor(private wearRepository: WearRepository) {}

  async create(body: WearDto, userId): Promise<WearEntity> {
    return await this.wearRepository.save({ ...body, userId });
  }

  async update(
    id: string,
    body: UpdateWearDto,
    userId: string,
  ): Promise<WearEntity> {
    await this.wearRepository.update(id, body);
    return await this.wearRepository.getOne(id, userId);
  }

  async getOne(id: string, userId?: string): Promise<WearEntity> {
    return await this.wearRepository.getOne(id, userId);
  }

  async getAll(
    size: number,
    page: number,
    userId: string,
  ): Promise<WearEntity[]> {
    return await this.wearRepository.getAll(size, page, userId);
  }

  async getByType(
    size: number,
    page: number,
    userId: string,
    type: WearType,
  ): Promise<WearEntity[]> {
    return await this.wearRepository.getByType(size, page, userId, type);
  }

  async search(
    size: number,
    page: number,
    name: string,
    type: WearType,
    brand: string,
    userId: string,
  ): Promise<WearEntity[]> {
    const array = [];
    
    if (brand) {
      const brands = brand.split(',');
      for (let br of brands) {
        const result = await this.wearRepository.searchNew(
          size,
          page,
          name,
          type,
          br,
          userId,
        );
        array.push(...result);
      }

      return array;
    } else {
      return await this.wearRepository.searchWithOutCategory(
        size,
        page,
        name,
        type,
        userId,
      );
    }
  }
  async getPinned(userId: string): Promise<WearEntity[]> {
    return await this.wearRepository.getPinned(userId);
  }

  async delete(id: string) {
    return await this.wearRepository.delete(id);
  }
}
