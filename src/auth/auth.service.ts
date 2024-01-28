import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AccessKeyDto } from './dto/accessKey.dto';
import { hashString } from 'src/utils/auth';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(signupDto: SignupDto) {
    const randomUUID = crypto.randomUUID();
    const randomSalt = await bcrypt.genSalt(10);
    // const hashedApiKey = await bcrypt.hash(randomUUID, randomSalt);
    const password = await bcrypt.hash(signupDto.password, randomSalt);

    return this.prisma.user.create({
      data: { ...signupDto, api_key: randomUUID, password },
      select: {
        id: true,
        email: true,
        api_key: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getAccessKey(accessKeyDto: AccessKeyDto): Promise<{ api_key: string }> {
    const foundUser = await this.prisma.user.findFirst({
      where: { email: accessKeyDto.email },
    });

    const isHasAccess = await bcrypt.compare(
      accessKeyDto.password,
      foundUser.password,
    );

    if (isHasAccess) return { api_key: foundUser.api_key };
    else throw new UnauthorizedException('You do not have access!');
  }
}
