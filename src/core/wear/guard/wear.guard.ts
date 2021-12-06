import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { WEAR_ERROR } from '../../wardrobe/enum/wear.enum';
import { WearRepository } from '../wear.repository';

@Injectable()
export class WearGuard implements CanActivate {
  constructor(private WearRepository: WearRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    if (!params.wearId) {
      throw new BadRequestException();
    }

    const wear = await this.WearRepository.findOne({
      where: { id: params.wearId, userId: request.user.id },
    });

    if (!wear) {
      throw new BadRequestException(WEAR_ERROR.WEAR_NOT_FOUND);
    }

    request.wearId = params.wearId;

    return true;
  }
}
