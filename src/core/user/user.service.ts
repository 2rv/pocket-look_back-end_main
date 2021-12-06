import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserProfileService } from '../user-profile-settings/user-profile-settings.service';
import { CreateGoogleUseDto } from './dto/create-user-google.dto';
import { CreateFacebookUseDto } from './dto/create-user-facebook.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userProfileService: UserProfileService,
  ) {}

  async createGoogleUser(body: CreateGoogleUseDto) {
    return await this.userRepository.create(body);
  }

  async saveGoogleUser(body: CreateGoogleUseDto): Promise<UserEntity> {
    const findUser = await this.userRepository.findOne({
      googleId: body.googleId,
      email: body.email,
    });
    if (findUser) {
      return findUser;
    } else {
      const user = await this.createGoogleUser(body);
      const userProfileId = await this.userProfileService.create();
      user.userProfileId = userProfileId;
      return await this.userRepository.save({
        ...user,
      });
    }
  }

  async createFacebookUser(body: CreateFacebookUseDto) {
    return await this.userRepository.create(body);
  }

  async saveFacebookUser(body: CreateFacebookUseDto): Promise<UserEntity> {
    const findUser = await this.userRepository.findOne({
      facebookId: body.facebookId,
      email: body.email,
    });
    if (findUser) {
      return findUser;
    } else {
      const user = await this.createFacebookUser(body);
      const userProfileId = await this.userProfileService.create();
      user.userProfileId = userProfileId;
      return await this.userRepository.save({
        ...user,
      });
    }
  }
}
