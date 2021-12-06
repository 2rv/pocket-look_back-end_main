import { Repository } from 'typeorm';
import { FileUploadRepository } from './file-upload.repository';
import { FileUploadEntity } from './file-upload.entity';
import { FILE_UPLOAD_ERROR } from './enum/file-upload-error.enum';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileUploadDto } from './dto/file-upload.dto';
import { uploadFile } from 'src/common/utils/file-upload';

@Injectable()
export class FileUploadService {
  constructor(private fileRepository: FileUploadRepository) {}

  async create(file: FileUploadDto, userId: any): Promise<FileUploadEntity> {
    const fileUrl = await uploadFile(file);
    return await this.fileRepository.save({ fileUrl: fileUrl, userId: userId });
  }

  async update(id: string, body) {
    return await this.fileRepository.update(id, body);
  }

  async getOne(id: string): Promise<FileUploadEntity> {
    return await this.fileRepository.findOne(id);
  }

  async getAll(userId: string): Promise<FileUploadEntity[]> {
    return await this.fileRepository.find({
      where: {
        userId: userId,
      },
    });
  }

  async delete(id: string) {
    return await this.fileRepository.delete(id);
  }
}
