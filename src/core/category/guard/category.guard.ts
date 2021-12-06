import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { CATEGORY_ERROR } from '../enum/category.enum';
import { CategoryRepository } from '../category.repository';

@Injectable()
export class CategoryGuard implements CanActivate {
  constructor(private categoryRepository: CategoryRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (!params.categoryId) {
      throw new BadRequestException();
    }

    const category = await this.categoryRepository.findOne({
      where: { id: params.categoryId },
    });

    if (!category) {
      throw new BadRequestException(CATEGORY_ERROR.CATEGORY_NOT_FOUND);
    }

    request.categoryId = params.categoryId;

    return true;
  }
}
