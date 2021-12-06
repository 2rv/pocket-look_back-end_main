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
import { WearGuard } from './guard/wear.guard';
import { UpdateWearDto } from './dto/update-wear.dto';
import { WearDto } from './dto/wear.dto';
import { WearService } from './wear.service';
import { GetUser } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { WearType } from '../category/enum/category.enum';
import { WearTypeValidationPipe } from './pipe/wear-type.pipe';
import { CategoryGuard } from '../category/guard/category.guard';

@Controller('wear')
export class WearController {
  constructor(private readonly wearService: WearService) {}

  @Post('/create')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(
    @Body(new ValidationPipe()) body: WearDto,
    @GetUser() user: UserEntity,
  ) {
    return await this.wearService.create(body, user.id);
  }

  @Get('get/:wearId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, WearGuard)
  async getOne(@Request() req, @GetUser() user: UserEntity) {
    return await this.wearService.getOne(req.wearId, user.id);
  }

  @Get('get/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll(
    @Query('size') size: number,
    @Query('page') page: number,
    @GetUser() user: UserEntity,
  ) {
    return await this.wearService.getAll(size, page, user.id);
  }

  @Get('type/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getByType(
    @Query('size') size: number,
    @Query('page') page: number,
    @GetUser() user: UserEntity,
    @Query(new WearTypeValidationPipe()) type: WearType,
  ) {
    return await this.wearService.getByType(size, page, user.id, type);
  }

  @Get('/search/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async search(
    @Query('size') size: number,
    @Query('page') page: number,
    @Query('name') name: string,
    @Query('brand') brand: string,
    @Query('type') type: WearType,
    @GetUser() user: UserEntity,
  ) {
    return await this.wearService.search(
      size,
      page,
      name,
      type,
      brand,
      user.id,
    );
  }

  @Get('pinned/get/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getPinned(@GetUser() user: UserEntity) {
    return await this.wearService.getPinned(user.id);
  }

  @Patch('update/:wearId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, WearGuard)
  async update(
    @GetUser() user: UserEntity,
    @Request() req,
    @Body() body: UpdateWearDto,
  ) {
    return await this.wearService.update(req.wearId, body, user.id);
  }

  @Delete('delete/:wearId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, WearGuard)
  async delete(@Request() req) {
    return await this.wearService.delete(req.wearId);
  }
}
