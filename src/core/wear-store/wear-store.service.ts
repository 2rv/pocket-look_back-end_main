import { Injectable } from '@nestjs/common';

import { WearStoreRepository } from './wear-store.repository';
import { WearStoreEntity } from './wear-store.entity';
import { WearStoreDto } from './dto/wear-store.dto';
import { UpdateWearStoreDto } from './dto/update-wear-store.dto';
import { WearType } from '../category/enum/category.enum';
import { CategoryEntity } from '../category/category.entity';

@Injectable()
export class WearStoreService {
  constructor(private wearStoreRepository: WearStoreRepository) {}

  async create(body: WearStoreDto): Promise<WearStoreEntity> {
    return await this.wearStoreRepository.save(body);
  }

  async update(id: string, body: UpdateWearStoreDto): Promise<WearStoreEntity> {
    await this.wearStoreRepository.update(id, body);
    return await this.wearStoreRepository.getOne(id);
  }

  async getOne(id: string): Promise<WearStoreEntity> {
    return await this.wearStoreRepository.getOne(id);
  }

  async getAll(size: number, page: number): Promise<WearStoreEntity[]> {
    return await this.wearStoreRepository.getAll(size, page);
  }

  async getByType(
    size: number,
    page: number,
    type: WearType,
  ): Promise<WearStoreEntity[]> {
    return await this.wearStoreRepository.getByType(size, page, type);
  }

  async search(
    size: number,
    page: number,
    name: string,
    categoryId: CategoryEntity,
  ): Promise<WearStoreEntity[]> {
    return await this.wearStoreRepository.search(size, page, name, categoryId);
  }

  async getPinned(): Promise<WearStoreEntity[]> {
    return await this.wearStoreRepository.getPinned();
  }

  async delete(id: string) {
    return await this.wearStoreRepository.delete(id);
  }
}
