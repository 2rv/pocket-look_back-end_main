import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import {
  generatePasswordSalt,
  generateBcryptHash,
} from '../../common/utils/hash';

import { USER_ROLE } from './enum/user-role.enum';
import { WearEntity } from '../wear/wear.entity';
import { UserProfileEntity } from '../user-profile-settings/user-profile-settings.entity';
import { FileUploadEntity } from '../file-upload/file-upload.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  password: string;

  @Column({ name: 'google_id', nullable: true })
  googleId?: string;

  @Column({ name: 'facebook_id', nullable: true })
  facebookId?: string;

  @Column({ nullable: true })
  email: string;

  @Column({
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.USER,
    nullable: false,
  })
  role: USER_ROLE;

  @CreateDateColumn()
  createDate: string;

  @OneToMany(() => FileUploadEntity, (file: FileUploadEntity) => file.userId)
  imageUrls: FileUploadEntity[];

  @OneToOne(
    () => UserProfileEntity,
    (userProfile: UserProfileEntity) => userProfile.userId,
    {
      cascade: true,
    },
  )
  userProfileId: UserProfileEntity;

  @OneToMany(() => WearEntity, (wear: WearEntity) => wear.userId)
  wearId: WearEntity[];

  static async hashPassword(password: string): Promise<string> {
    const salt = await generatePasswordSalt(password);
    return generateBcryptHash(password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    const salt = await generatePasswordSalt(password);
    const hashPassword = generateBcryptHash(password, salt);
    return this.password === hashPassword;
  }
}
