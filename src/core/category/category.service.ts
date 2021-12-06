import { Injectable } from '@nestjs/common';

import { CategoryRepository } from './category.repository';
import { CategoryEntity } from './category.entity';
import { CategoryDto } from './dto/category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(body: CategoryDto): Promise<CategoryEntity> {
    return await this.categoryRepository.save(body);
  }

  async update(id: string, body: UpdateCategoryDto): Promise<CategoryEntity> {
    await this.categoryRepository.update(id, body);
    return await this.categoryRepository.findOne(id);
  }

  async getOne(id: string): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne(id);
  }

  async getAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async delete(id: string) {
    return await this.categoryRepository.delete(id);
  }
}
