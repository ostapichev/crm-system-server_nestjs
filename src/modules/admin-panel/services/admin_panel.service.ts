import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { UserRoleEnum } from '../../../database/enums';
import { IActivateToken } from '../../auth/interfaces/token-pair.interface';
import { AuthCacheService } from '../../auth/services/auth-cache.service';
import { TokenService } from '../../auth/services/token.service';
import { OrderRepository } from '../../repository/services/order.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UsersService } from '../../users/services/users.service';
import { OrdersStatisticResDto } from '../dto/res/orders-statistic.res.dto';

@Injectable()
export class AdminPanelService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly authCacheService: AuthCacheService,
    private readonly userRepository: UserRepository,
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  public async getOrdersStatistic(): Promise<OrdersStatisticResDto> {
    return await this.orderRepository.getStatistic();
  }

  public async getActivateToken(userId: number): Promise<IActivateToken> {
    const token = await this.tokenService.generateActivateToken({ userId });
    await this.authCacheService.saveActivateToken(token.activateToken, userId);
    return token;
  }

  public async banUser(userId: number): Promise<void> {
    const user = await this.userService.getUser(userId);
    if (user.role === UserRoleEnum.ADMIN) {
      throw new ForbiddenException('You do not have permissions!');
    }
    if (!user.is_active) {
      throw new BadRequestException('The user is banned!');
    }
    await this.userRepository.update(user.id, {
      is_active: false,
    });
  }

  public async unbanUser(userId: number): Promise<void> {
    const user = await this.userService.getUser(userId);
    if (user.is_active) {
      throw new BadRequestException('The user is active!');
    }
    await this.userRepository.update(user.id, {
      is_active: true,
    });
  }
}
