import {
  Controller,
  Post,
  UseGuards,
  Get,
  Put,
  Delete,
  Request,
  UploadedFile,
  UseInterceptors,
  Patch,
  Body,
  Query,
} from '@nestjs/common';

import { UserProfileService } from './user-profile-settings.service';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { UpdateUserProfileDto } from './dto/update-user-profile-settings.dto';
import { OwnUserProfileGuard } from './guard/own-user-profile-settings.guard';
import { GetUser } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { UserProfileGuard } from './guard/user-profile-settings.guard';

@Controller('profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Patch('update/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, OwnUserProfileGuard)
  async updateWearCollection(
    @Request() req,
    @Body() body: UpdateUserProfileDto,
  ) {
    return await this.userProfileService.update(req.userProfileId, body);
  }

  @Get('get/own')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, OwnUserProfileGuard)
  async getOwn(@Request() req) {
    return await this.userProfileService.getOne(req.userProfileId);
  }

  @Get('get/search')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, OwnUserProfileGuard)
  async search(
    @Query('size') size: number,
    @Query('page') page: number,
    @Query('name') name: string,
  ) {
    return await this.userProfileService.search(size, page, name);
  }

  @Get('get/:userProfileId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, UserProfileGuard)
  async getOne(@Request() req) {
    return await this.userProfileService.getOne(req.userProfileId);
  }
}
