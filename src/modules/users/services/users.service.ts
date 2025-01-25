import { Injectable, NotFoundException } from '@nestjs/common';

import { UserEntity } from '../../../database/entities';
import { UserListQueryDto } from '../../auth/dto/req/user-list-query.dto';
import { UserRepository } from '../../repository/services/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAllUsers(
    query: UserListQueryDto,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.getListAllUsers(query);
  }

  public async getUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }
}
