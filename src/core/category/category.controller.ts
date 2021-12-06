import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Delete,
  Patch,
  Request,
} from '@nestjs/common';

import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { CategoryEntity } from './category.entity';
import { CategoryGuard } from './guard/category.guard';
import { CategoryDto } from './dto/category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(
    @Body(new ValidationPipe()) body: CategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoryService.create(body);
  }

  @Get('get/:categoryId')
  @UseGuards(AuthGuard('jwt'), AccountGuard, CategoryGuard)
  async getOne(@Request() req): Promise<CategoryEntity> {
    return await this.categoryService.getOne(req.categoryId);
  }

  @Get('get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll(): Promise<CategoryEntity[]> {
    return await this.categoryService.getAll();
  }

  @Patch('update/:categoryId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, CategoryGuard)
  async update(@Request() req, @Body() body: UpdateCategoryDto) {
    return await this.categoryService.update(req.categoryId, body);
  }

  @Delete('delete/:categoryId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, CategoryGuard)
  async delete(@Request() req) {
    return await this.categoryService.delete(req.categoryId);
  }
}
