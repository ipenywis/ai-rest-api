import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const apiKeyHeader = request.headers['api-key'];

    if (!apiKeyHeader) return false;

    const foundUser = await this.prisma.user.findFirst({
      where: { api_key: apiKeyHeader },
    });

    if (!foundUser || foundUser.api_key !== apiKeyHeader) return false;

    return true;
  }
}
