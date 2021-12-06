import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { FileUploadRepository } from '../file-upload.repository';
import { FILE_UPLOAD_ERROR } from '../enum/file-upload-error.enum';

@Injectable()
export class FileUploadGuard implements CanActivate {
  constructor(private fileUploadRepository: FileUploadRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (!params.fileId) {
      throw new BadRequestException();
    }

    const file = await this.fileUploadRepository.findOne({
      where: { id: params.fileId },
    });

    if (!file) {
      throw new BadRequestException(FILE_UPLOAD_ERROR.FILE_NOT_FOUND);
    }
    request.fileId = params.fileId;
    return true;
  }
}
