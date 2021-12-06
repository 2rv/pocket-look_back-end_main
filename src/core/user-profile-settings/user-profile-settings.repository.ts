import { EntityRepository, Repository } from 'typeorm';
import { UserProfileEntity } from './user-profile-settings.entity';

@EntityRepository(UserProfileEntity)
export class UserProfileRepository extends Repository<UserProfileEntity> {
  async getOne(id: string): Promise<UserProfileEntity> {
    return await this.createQueryBuilder('user_profile')
      .leftJoinAndSelect('user_profile.avatar', 'avatar')
      .where('user_profile.id = :id', { id })
      .getOne();
  }

  async search(
    size: number,
    page: number,
    name: string,
  ): Promise<UserProfileEntity[]> {
    const take = size || 10;
    const skip = (page - 1) * size || 0;
    const findName = name;
    return await this.createQueryBuilder('user_profile')
      .leftJoinAndSelect('user_profile.avatar', 'avatar')
      .where('user_profile.name ilike :name', { name: `%${findName}%` })
      .limit(take)
      .offset(skip)
      .getMany();
  }
}
