import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
  Get,
  Delete,
  Patch,
  Request,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { BrandEntity } from './brand.entity';
import { BrandGuard } from './guard/brand.guard';
import { BrandDto } from './dto/brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('/create')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async save(@Body(new ValidationPipe()) body: BrandDto): Promise<BrandEntity> {
    return await this.brandService.create(body);
  }

  @Get('get/:brandId')
  @UseGuards(AuthGuard('jwt'), AccountGuard, BrandGuard)
  async getOne(@Request() req): Promise<BrandEntity> {
    return await this.brandService.getOne(req.brandId);
  }

  @Get('get/')
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll(): Promise<BrandEntity[]> {
    return await this.brandService.getAll();
  }

  @Patch('update/:brandId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, BrandGuard)
  async update(@Request() req, @Body() body: any): Promise<BrandEntity> {
    return await this.brandService.update(req.brandId, body);
  }

  @Delete('delete/:brandId')
  @Roles(USER_ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), AccountGuard, BrandGuard)
  async delete(@Request() req) {
    return await this.brandService.delete(req.brandId);
  }
}
