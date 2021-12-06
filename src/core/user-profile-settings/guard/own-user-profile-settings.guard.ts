import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { USER_PROFILE_ERROR } from '../enum/user-profile-settings-error.enum';
import { UserProfileRepository } from '../user-profile-settings.repository';

@Injectable()
export class OwnUserProfileGuard implements CanActivate {
  constructor(private userProfileRepository: UserProfileRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userProfile = await this.userProfileRepository.findOne({
      where: {
        userId: request.user.id,
      },
    });

    if (!userProfile) {
      throw new BadRequestException(
        USER_PROFILE_ERROR.USER_PROFILE_WITH_THIS_ID_NOT_FOUND,
      );
    }

    request.userProfileId = userProfile.id;

    return true;
  }
}
