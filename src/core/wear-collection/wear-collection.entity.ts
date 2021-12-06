import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

import { CollectionEntity } from '../collection/collection.entity';
import { WearEntity } from '../wear/wear.entity';
import { WearStoreEntity } from '../wear-store/wear-store.entity';

@Entity({ name: 'wear_collection' })
export class WearCollectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => CollectionEntity,
    (collection: CollectionEntity) => collection.wear,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({
    name: 'collection_id',
  })
  collection: CollectionEntity;

  @ManyToOne(() => WearEntity, (wear: WearEntity) => wear.wearCollectionId, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'wear_id',
  })
  wearId: WearEntity;

  @ManyToOne(
    () => WearStoreEntity,
    (wearStore: WearStoreEntity) => wearStore.wearCollectionId,
  )
  @JoinColumn({
    name: 'wear_store_id',
  })
  wearStoreId: WearStoreEntity;
}
