import { Injectable } from '@nestjs/common';

import { WearDto } from './dto/wear.dto';
import { UpdateWearDto } from './dto/update-wear.dto';
import { WearType } from '../category/enum/category.enum';
import { CategoryEntity } from '../category/category.entity';
import { WearStoreService } from '../wear-store/wear-store.service';
import { CollectionService } from '../collection/collection.service';
import { WearRepository } from '../wear/wear.repository';
import { WearStoreRepository } from '../wear-store/wear-store.repository';
import { CollectionRepository } from '../collection/collection.repository';
import { WEAR_LANE_TYPE } from './enum/wear_lane_type.enum';

@Injectable()
export class WardrobeService {
  constructor(
    private wearRepository: WearRepository,
    private wearStoreRepository: WearStoreRepository,
    private collectionRepository: CollectionRepository,
  ) {}

  async search(
    size: number,
    page: number,
    name: string,
    categoryId: CategoryEntity,
    userId: string,
  ): Promise<any> {
    const addedWear = await this.wearRepository.search(
      size,
      page,
      name,
      categoryId,
      userId,
    );
    const wearStore = await this.wearStoreRepository.search(
      size,
      page,
      name,
      categoryId,
    );
    const myCollection = await this.collectionRepository.search(
      size,
      page,
      name,
      categoryId,
      userId,
    );

    return {
      manekens: {
        name: 'My Collection',
        type: WEAR_LANE_TYPE.MY_COLLECTION,
        clothes: myCollection,
      },
      clothesLanes: [
        {
          name: 'Added Wear',
          type: WEAR_LANE_TYPE.ADDED_WEAR,
          clothes: addedWear,
        },
        {
          name: 'Wear from Store',
          type: WEAR_LANE_TYPE.WEAR_FROM_STORE,
          clothes: wearStore,
        },
      ],
    };
  }

  async seeMore(
    size: number,
    page: number,
    name: string,
    type: string,
    categoryId: CategoryEntity,
    userId: string,
  ): Promise<any> {
    switch (type) {
      case WEAR_LANE_TYPE.ADDED_WEAR:
        return await this.wearRepository.search(
          size,
          page,
          name,
          categoryId,
          userId,
        );

      case WEAR_LANE_TYPE.WEAR_FROM_STORE:
        return await this.wearStoreRepository.search(
          size,
          page,
          name,
          categoryId,
        );
      case WEAR_LANE_TYPE.MY_COLLECTION:
        const myCollection = await this.collectionRepository.search(
          size,
          page,
          name,
          categoryId,
          userId,
        );
        return myCollection;
    }
  }
}
