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
  Param,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { CollectionGuard } from './guard/collection.guard';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionDto } from './dto/collection.dto';
import { CollectionService } from './collection.service';
import { GetUser } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { CategoryGuard } from '../category/guard/category.guard';
import { WearTypeValidationPipe } from '../wear/pipe/wear-type.pipe';
import { WearType } from '../category/enum/category.enum';
import { BrandEntity } from '../brand/brand.entity';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post('/create')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(
    @Body(new ValidationPipe()) body: any,
    @GetUser() user: UserEntity,
  ) {
    return await this.collectionService.save(body, user.id);
  }

  @Get('get/:collectionId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, CollectionGuard)
  async getOne(@Request() req, @GetUser() user: UserEntity) {
    return await this.collectionService.getOne(req.collectionId, user.id);
  }

  @Get('get/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll(
    @Query('size') size: number,
    @Query('page') page: number,
    @GetUser() user: UserEntity,
  ) {
    return await this.collectionService.getAll(size, page, user.id);
  }

  @Get('search/')
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
    return await this.collectionService.search(
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
    return await this.collectionService.getPinned(user.id);
  }

  @Patch('update/:collectionId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, CollectionGuard)
  async update(
    @GetUser() user: UserEntity,
    @Request() req,
    @Body() body: UpdateCollectionDto,
  ) {
    return await this.collectionService.update(req.collectionId, body, user.id);
  }

  @Delete('delete/:collectionId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, CollectionGuard)
  async delete(@Request() req) {
    return await this.collectionService.delete(req.collectionId);
  }
}
