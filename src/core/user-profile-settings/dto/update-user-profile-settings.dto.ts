import { IsString, IsOptional } from 'class-validator';
import { USER_PREFERENCE } from '../enum/user-profile-settings-preference.enum';
import { FileUploadEntity } from 'src/core/file-upload/file-upload.entity';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  login: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  about: string;

  @IsOptional()
  @IsString()
  preference: USER_PREFERENCE;

  @IsOptional()
  avatar: FileUploadEntity;
}
