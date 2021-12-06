import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { COLLECTION_ERROR } from '../enum/collection.enum';
import { CollectionRepository } from './../collection.repository';

@Injectable()
export class CollectionGuard implements CanActivate {
  constructor(private collectionRepository: CollectionRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    if (!params.collectionId) {
      throw new BadRequestException();
    }

    const collection = await this.collectionRepository.findOne({
      where: { id: params.collectionId, userId: request.user.id },
    });

    if (!collection) {
      throw new BadRequestException(COLLECTION_ERROR.COLLECTION_NOT_FOUND);
    }

    request.collectionId = params.collectionId;

    return true;
  }
}
