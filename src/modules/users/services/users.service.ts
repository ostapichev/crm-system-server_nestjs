import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { UserEntity } from '../../../database/entities';
import { UserRoleEnum } from '../../../database/enums';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { AuthCacheService } from '../../auth/services/auth-cache.service';
import { UserRepository } from '../../repository/services/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly userRepository: UserRepository,
    private readonly authCacheService: AuthCacheService,
  ) {}

  public async findMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.getByIdUser(userData.userId);
  }

  public async findOne(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.getByIdUser(userId);
    if (!user || user.role === UserRoleEnum.SUPERUSER) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }
}
