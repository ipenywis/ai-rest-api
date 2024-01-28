import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { AccessKeyDto } from './dto/accessKey.dto';
import { AuthGuard } from './auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authSerive: AuthService) {}

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    console.log('Body: ', signupDto);
    return this.authSerive.signup(signupDto);
  }

  @Post('/access-key')
  async accessKey(@Body() accessKeyDto: AccessKeyDto) {
    console.log('Key: ', accessKeyDto);
    return this.authSerive.getAccessKey(accessKeyDto);
  }
}
