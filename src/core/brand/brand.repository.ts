import { BrandEntity } from './brand.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(BrandEntity)
export class BrandRepository extends Repository<BrandEntity> {}
