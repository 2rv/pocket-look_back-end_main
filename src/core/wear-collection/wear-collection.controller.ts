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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { WearCollectionGuard } from './guard/wear-collection.guard';

import { GetUser } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { WearCollectionService } from './wear-collection.service';
import { UpdateWearCollectionDto } from '../collection/dto/update-wear-collection.dto';

@Controller('wear-collection')
export class WearCollectionController {
  constructor(private readonly wearCollectionService: WearCollectionService) {}

  @Patch('update/:wearCollectionId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, WearCollectionGuard)
  async updateWearCollection(
    @GetUser() user: UserEntity,
    @Request() req,
    @Body() body: UpdateWearCollectionDto,
  ) {
    return await this.wearCollectionService.update(
      req.wearCollectionId,
      body,
      user.id,
      req.collectionId,
    );
  }

  @Delete('delete/:wearCollectionId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, WearCollectionGuard)
  async delete(@Request() req) {
    return await this.wearCollectionService.delete(req.wearCollectionId);
  }
}
