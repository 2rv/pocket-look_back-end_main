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
import { WearStoreGuard } from './guard/wear-store.guard';
import { UpdateWearStoreDto } from './dto/update-wear-store.dto';
import { WearStoreDto } from './dto/wear-store.dto';
import { WearStoreService } from './wear-store.service';
import { WearType } from '../category/enum/category.enum';
import { WearTypeValidationPipe } from '../wear/pipe/wear-type.pipe';
import { CategoryGuard } from '../category/guard/category.guard';

@Controller('wear-store')
export class WearController {
  constructor(private readonly wearStoreService: WearStoreService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: WearStoreDto) {
    return await this.wearStoreService.create(body);
  }

  @Get('get/:wearStoreId')
  @UseGuards(AuthGuard('jwt'), AccountGuard, WearStoreGuard)
  async getOne(@Request() req) {
    return await this.wearStoreService.getOne(req.wearStoreId);
  }

  @Get('get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll(@Query('size') size: number, @Query('page') page: number) {
    return await this.wearStoreService.getAll(size, page);
  }

  @Get('type/get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getByType(
    @Query('size') size: number,
    @Query('page') page: number,
    @Query(new WearTypeValidationPipe()) type: WearType,
  ) {
    return await this.wearStoreService.getByType(size, page, type);
  }

  @Get('category/get/:categoryId')
  @UseGuards(CategoryGuard)
  async search(
    @Query('size') size: number,
    @Query('page') page: number,
    @Query('name') name: string,
    @Req() req,
  ) {
    return await this.wearStoreService.search(size, page, name, req.categoryId);
  }

  @Get('pinned/get/')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getPinned() {
    return await this.wearStoreService.getPinned();
  }

  @Patch('update/:wearStoreId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, WearStoreGuard)
  async update(@Request() req, @Body() body: UpdateWearStoreDto) {
    return await this.wearStoreService.update(req.wearStoreId, body);
  }

  @Delete('delete/:wearStoreId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, WearStoreGuard)
  async delete(@Request() req) {
    return await this.wearStoreService.delete(req.wearStoreId);
  }
}
