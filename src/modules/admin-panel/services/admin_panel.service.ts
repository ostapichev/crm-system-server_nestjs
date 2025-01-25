import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { UserRoleEnum } from '../../../database/enums';
import { UserRepository } from '../../repository/services/user.repository';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AdminPanelService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UsersService,
  ) {}

  public async banUser(userId: number): Promise<void> {
    const user = await this.userService.getUser(userId);
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
    const user = await this.userService.getUser(userId);
    if (user.is_active) {
      throw new BadRequestException('The user is active!');
    }
    await this.userRepository.update(userId, {
      is_active: true,
    });
  }
}
