import { ActivateTokenResDto } from '../dto/res/activate-token.res.dto';

export class ActivateTokenMapper {
  public static toResponseItemDTO(
    dto: ActivateTokenResDto,
  ): ActivateTokenResDto {
    return {
      activateToken: dto.activateToken,
      message: dto.message,
    };
  }
}
