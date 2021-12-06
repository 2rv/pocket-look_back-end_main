import { Injectable } from '@nestjs/common';
import { BrandDto } from './dto/brand.dto';
import { BrandEntity } from './brand.entity';
import { BrandRepository } from './brand.repository';

@Injectable()
export class BrandService {
  constructor(private brandRepository: BrandRepository) {}

  async create(body: BrandDto): Promise<BrandEntity> {
    return await this.brandRepository.save(body);
  }

  async update(id: string, body: BrandDto): Promise<BrandEntity> {
    await this.brandRepository.update(id, body);
    return await this.brandRepository.findOne(id);
  }

  async getOne(id: string): Promise<BrandEntity> {
    return await this.brandRepository.findOne(id);
  }

  async getAll(): Promise<BrandEntity[]> {
    return await this.brandRepository.find();
  }

  async delete(id: string) {
    return await this.brandRepository.delete(id);
  }
}
