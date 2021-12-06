import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { WEAR_STORE_ERROR } from '../enum/wear-store.enum';
import { WearStoreRepository } from '../wear-store.repository';

@Injectable()
export class WearStoreGuard implements CanActivate {
  constructor(private wearStoreRepository: WearStoreRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    if (!params.wearStoreId) {
      throw new BadRequestException();
    }

    const wearStore = await this.wearStoreRepository.findOne({
      where: { id: params.wearStoreId },
    });

    if (!wearStore) {
      throw new BadRequestException(WEAR_STORE_ERROR.WEAR_STORE_NOT_FOUND);
    }

    request.wearStoreId = params.wearStoreId;

    return true;
  }
}
