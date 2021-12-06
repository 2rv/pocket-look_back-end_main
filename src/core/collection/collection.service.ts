import { Injectable } from '@nestjs/common';
import { CollectionRepository } from './collection.repository';
import { CollectionEntity } from './collection.entity';
import { WearCollectionRepository } from '../wear-collection/wear-collection.repository';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { WearType } from '../category/enum/category.enum';
import { createManekenImage } from './draw-maneken.service';
import { WearRepository } from '../wear/wear.repository';
import { s3_upload_base64 } from '../../common/utils/file-upload';

@Injectable()
export class CollectionService {
  constructor(
    private WearService: WearRepository,
    private collectionRepository: CollectionRepository,
    private wearCollectionRepository: WearCollectionRepository,
  ) {}

  async create(userId) {
    return await this.collectionRepository.create({ userId: userId });
  }

  async save(body: CreateCollectionDto, userId): Promise<CollectionEntity> {
    const collection = await this.create(userId);
    const wearId: any = body;
    collection.wear = body.wear;
    var headUrl: string;
    var bodyUrl: string;
    var trousersUrl: string;
    var footUrl: string;

    for (let id of wearId.wear) {
      const result = await this.WearService.getOne(id.wearId);

      if (result.categoryId.type === WearType.HEADDRESS) {
        headUrl = result.fileId.fileUrl;
      }

      if (result.categoryId.type === WearType.OUTERWEAR) {
        bodyUrl = result.fileId.fileUrl;
      }

      if (result.categoryId.type === WearType.UNDERWEAR) {
        trousersUrl = result.fileId.fileUrl;
      }

      if (result.categoryId.type === WearType.SHOES) {
        footUrl = result.fileId.fileUrl;
      }
    }

    const maneken: string = await createManekenImage(
      headUrl,
      bodyUrl,
      trousersUrl,
      footUrl,
    );

    const buffer = Buffer.from(
      maneken.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const image = await s3_upload_base64(buffer);
    const imageUrl = image.Location;

    collection.fileUrl = imageUrl;
    collection.name = body.name;

    return await this.collectionRepository.save({
      ...collection,
    });
  }

  async update(
    id: string,
    body: UpdateCollectionDto,
    userId: string,
  ): Promise<CollectionEntity> {
    await this.collectionRepository.update(id, body);
    return await this.collectionRepository.getOne(id, userId);
  }

  async getOne(id: string, userId: string): Promise<CollectionEntity> {
    return await this.collectionRepository.getOne(id, userId);
  }

  async getAll(size: number, page: number, userId: string): Promise<any[]> {
    return await this.collectionRepository.getAll(size, page, userId);
  }

  async search(
    size: number,
    page: number,
    name: string,
    type: WearType,
    brand: string,
    userId: string,
  ): Promise<any[]> {
    const array = [];

    if (brand) {
      const brands = brand.split(',');
      for (let br of brands) {
        const result = await this.collectionRepository.searchNew(
          size,
          page,
          name,
          type,
          br,
          userId,
        );
        array.push(...result);
      }

      return array;
    } else {
      return await this.collectionRepository.searchWithoutCategory(
        size,
        page,
        name,
        type,
        userId,
      );
    }
  }

  async getPinned(userId: string): Promise<CollectionEntity[]> {
    return await this.collectionRepository.getPinned(userId);
  }

  async delete(id: string) {
    return await this.collectionRepository.delete(id);
  }
}
