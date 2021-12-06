import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { WEAR_COLLECTION_ERROR } from '../enum/wear-collection.enum';
import { WearCollectionRepository } from '../wear-collection.repository';

@Injectable()
export class WearCollectionGuard implements CanActivate {
  constructor(private wearCollectionRepository: WearCollectionRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (!params.wearCollectionId) {
      throw new BadRequestException();
    }

    const wearCollection = await this.wearCollectionRepository.getOne(
      params.wearCollectionId,
    );

    if (!wearCollection) {
      throw new BadRequestException(
        WEAR_COLLECTION_ERROR.WEAR_COLLECTION_NOT_FOUND,
      );
    }

    request.wearCollectionId = params.wearCollectionId;
    request.collectionId = wearCollection.collection.id;

    return true;
  }
}
