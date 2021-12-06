import { Injectable } from '@nestjs/common';

import { UpdateUserProfileDto } from './dto/update-user-profile-settings.dto';
import { UserProfileRepository } from './user-profile-settings.repository';
import { UserProfileEntity } from './user-profile-settings.entity';

@Injectable()
export class UserProfileService {
  constructor(private userProfileRepository: UserProfileRepository) {}

  async create() {
    return await this.userProfileRepository.create();
  }

  async update(
    id: string,
    body: UpdateUserProfileDto,
  ): Promise<UserProfileEntity> {
    await this.userProfileRepository.update(id, body);
    return await this.userProfileRepository.getOne(id);
  }

  async getOne(id: string): Promise<UserProfileEntity> {
    return await this.userProfileRepository.getOne(id);
  }

  async search(
    size: number,
    page: number,
    name: string,
  ): Promise<UserProfileEntity[]> {
    return await this.userProfileRepository.search(size, page, name);
  }
}
