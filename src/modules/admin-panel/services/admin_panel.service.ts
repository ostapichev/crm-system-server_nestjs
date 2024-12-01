import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserEntity } from '../../../database/entities';
import { UserRoleEnum } from '../../../database/enums';
import { UserListQueryDto } from '../../auth/dto/req/user-list-query.dto';
import { UserRepository } from '../../repository/services/user.repository';

@Injectable()
export class AdminPanelService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAllUsers(
    query: UserListQueryDto,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.getListAllUsers(query);
  }

  public async findOne(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.getByIdUser(userId);
    if (!user || user.role === UserRoleEnum.ADMIN) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }

  public async banUser(userId: number): Promise<void> {
    const user = await this.getUser(userId);
    if (user.role === UserRoleEnum.ADMIN) {
      throw new ForbiddenException('You do not have permissions!');
    }
    if (!user.is_active) {
      throw new BadRequestException('The user is banned!');
    }
    await this.userRepository.update(userId, {
      is_active: false,
    });
  }

  public async unbanUser(userId: number): Promise<void> {
    const user = await this.getUser(userId);
    if (user.is_active) {
      throw new BadRequestException('The user is active!');
    }
    await this.userRepository.update(userId, {
      is_active: true,
    });
  }

  private async getUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }
}
