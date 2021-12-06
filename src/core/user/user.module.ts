import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserProfileModule } from '../user-profile-settings/user-profile-settings.module';

@Module({
  imports: [UserProfileModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
