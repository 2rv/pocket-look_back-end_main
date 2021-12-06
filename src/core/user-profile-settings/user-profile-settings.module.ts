import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserProfileService } from './user-profile-settings.service';
import { UserProfileRepository } from './user-profile-settings.repository';
import { UserProfileController } from './user-profile-settings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileRepository])],
  providers: [UserProfileService],
  exports: [UserProfileService],
  controllers: [UserProfileController],
})
export class UserProfileModule {}
