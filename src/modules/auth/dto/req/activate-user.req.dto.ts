import { PickType } from '@nestjs/swagger';

import { SignInReqDto } from './sign-in.req.dto';

export class ActivateUserReqDto extends PickType(SignInReqDto, ['password']) {}
