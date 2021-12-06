import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { WearCollectionEntity } from '../wear-collection/wear-collection.entity';

@Entity({ name: 'collection' })
export class CollectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'bool',
    name: 'pinned',
    default: false,
  })
  pinned?: boolean;

  @Column({
    type: 'varchar',
    name: 'file_url',
    nullable: true,
  })
  fileUrl?: string;

  @Column({
    type: 'varchar',
    name: 'name',
    nullable: true,
  })
  name?: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.wearId)
  @JoinColumn({
    name: 'user_id',
  })
  userId: UserEntity;

  @OneToMany(
    () => WearCollectionEntity,
    (wearCollection: WearCollectionEntity) => wearCollection.collection,
    {
      cascade: true,
    },
  )
  wear: WearCollectionEntity[];
}
