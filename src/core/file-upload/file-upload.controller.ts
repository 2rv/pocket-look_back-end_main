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
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from '@nestjs/passport';
import { AccountGuard } from '../user/guard/account.guard';
import { Roles } from '../user/decorator/role.decorator';
import { USER_ROLE } from '../user/enum/user-role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from '../user/decorator/get-account.decorator';
import { UserEntity } from '../user/user.entity';
import { FileUploadGuard } from './guard/file-upload.guard';

@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('/create')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  @UseInterceptors(FileInterceptor('file'))
  async save(@UploadedFile() file, @GetUser() user: UserEntity): Promise<any> {
    return await this.fileUploadService.create(file, user.id);
  }

  @Put('update/:id')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, FileUploadGuard)
  @UseInterceptors(FileInterceptor('file'))
  async update(@Request() req, @UploadedFile() file) {
    return await this.fileUploadService.update(req.fileId, file);
  }

  @Get('get/:fileId')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, FileUploadGuard)
  async getOne(@Request() req) {
    return await this.fileUploadService.getOne(req.fileId);
  }
  e;

  @Get('get/')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard)
  async getAll(@GetUser() user: UserEntity) {
    return await this.fileUploadService.getAll(user.id);
  }

  @Delete('delete/:id')
  @Roles(USER_ROLE.USER)
  @UseGuards(AuthGuard('jwt'), AccountGuard, FileUploadGuard)
  async delete(@Request() req) {
    return await this.fileUploadService.delete(req.fileId);
  }
}
