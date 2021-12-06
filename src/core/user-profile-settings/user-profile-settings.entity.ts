import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { USER_PREFERENCE } from './enum/user-profile-settings-preference.enum';
import { FileUploadEntity } from '../file-upload/file-upload.entity';
import { WearEntity } from '../wear/wear.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'user_profile' })
@Unique(['login'])
export class UserProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'login',
    unique: true,
    nullable: true,
  })
  login?: string;

  @Column({
    type: 'varchar',
    name: 'name',
    nullable: true,
  })
  name?: string;

  @Column({
    type: 'varchar',
    name: 'about',
    nullable: true,
  })
  about?: string;

  @Column({
    type: 'enum',
    enum: USER_PREFERENCE,
    nullable: true,
  })
  preference?: USER_PREFERENCE;

  @CreateDateColumn()
  createDate: string;

  @OneToOne(
    () => FileUploadEntity,
    (file: FileUploadEntity) => file.userProfileId,
  )
  @JoinColumn({
    name: 'avatar',
  })
  avatar: FileUploadEntity;

  @OneToMany(() => WearEntity, (wear: WearEntity) => wear.userId)
  wearId: WearEntity[];

  @OneToOne(() => UserEntity, (user: UserEntity) => user.userProfileId)
  @JoinColumn({
    name: 'user_id',
  })
  userId: UserEntity;
}
