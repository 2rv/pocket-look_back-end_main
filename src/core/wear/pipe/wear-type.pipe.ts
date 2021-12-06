import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { WearType } from 'src/core/category/enum/category.enum';
import { WEAR_ERROR } from '../enum/wear.enum';

@Injectable()
export class WearTypeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const wearTypes = Object.values(WearType);
    const type = Number(value.type);
    const index = wearTypes.indexOf(type);
    console.log(index);
    if (index === -1) {
      throw new BadRequestException(WEAR_ERROR.WEAR_TYPE_NOT_FOUND);
    }
    return type;
  }
}
