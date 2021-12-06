import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { USER_PROFILE_ERROR } from '../enum/user-profile-settings-error.enum';
import { UserProfileRepository } from '../user-profile-settings.repository';

@Injectable()
export class UserProfileGuard implements CanActivate {
  constructor(private userProfileRepository: UserProfileRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { params } = request;

    if (!params.userProfileId) {
      throw new BadRequestException();
    }

    const userProfile = await this.userProfileRepository.getOne(
      params.userProfileId,
    );
    if (!userProfile) {
      throw new BadRequestException(
        USER_PROFILE_ERROR.USER_PROFILE_WITH_THIS_ID_NOT_FOUND,
      );
    }

    request.userProfileId = params.userProfileId;
    return true;
  }
}
