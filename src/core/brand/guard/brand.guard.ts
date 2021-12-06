import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { BRAND_ERROR } from '../enum/brand.enum';
import { BrandRepository } from '../brand.repository';

@Injectable()
export class BrandGuard implements CanActivate {
  constructor(private brandRepository: BrandRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (!params.brandId) {
      throw new BadRequestException();
    }

    const brand = await this.brandRepository.findOne({
      where: { id: params.brandId },
    });

    if (!brand) {
      throw new BadRequestException(BRAND_ERROR.BRAND_NOT_FOUND);
    }

    request.brandId = params.brandId;

    return true;
  }
}
