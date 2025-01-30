import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { Config, UserConfig } from '../../../config';
import { UserEntity } from '../../../database/entities';
import { UserRoleEnum } from '../../../database/enums';
import { UserRepository } from '../../repository/services/user.repository';

@Injectable()
export class SuperUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService<Config>,
  ) {}

  public async createSuperUser(): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({
      role: UserRoleEnum.ADMIN,
    });
    if (!user) {
      const config = this.configService.get<UserConfig>('superuser');
      const password = await bcrypt.hash(config.password, 10);
      await this.userRepository.save({
        name: config.name,
        surname: config.surname,
        email: config.email,
        password: password,
        role: UserRoleEnum.ADMIN,
        is_active: true,
      });
      Logger.log('Super user created!');
      return user;
    }
  }
}
