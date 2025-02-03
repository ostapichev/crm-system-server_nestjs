import { UserRoleEnum } from '../../../database/enums';

export interface IUserData {
  userId: number;
  name: string;
  surname: string;
  email: string;
  is_active: boolean;
  last_login: Date;
  role: UserRoleEnum;
}
