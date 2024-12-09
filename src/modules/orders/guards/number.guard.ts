import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class NumberGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { orderId } = request.params;
    if (isNaN(orderId)) {
      throw new NotFoundException(`Order not found`);
    }
    return true;
  }
}
