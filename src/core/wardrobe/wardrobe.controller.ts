import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Query,
  Delete,
  Request,
  Patch,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { GetUser } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { CategoryGuard } from '../category/guard/category.guard';
import { WardrobeService } from './wardrobe.service';

@Controller('wardrobe')
export class WardrobeController {
  constructor(private readonly wardrobeService: WardrobeService) {}

  @Get('category/get/:categoryId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, CategoryGuard)
  async search(
    @Query('size') size: number,
    @Query('page') page: number,
    @Query('name') name: string,
    @GetUser() user: UserEntity,
    @Req() req,
  ) {
    return await this.wardrobeService.search(
      size,
      page,
      name,
      req.categoryId,
      user.id,
    );
  }

  @Get('see-more/:categoryId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, CategoryGuard)
  async seeMore(
    @Query('size') size: number,
    @Query('page') page: number,
    @Query('name') name: string,
    @Query('type') type: string,
    @GetUser() user: UserEntity,
    @Req() req,
  ) {
    return await this.wardrobeService.seeMore(
      size,
      page,
      name,
      type,
      req.categoryId,
      user.id,
    );
  }
}
