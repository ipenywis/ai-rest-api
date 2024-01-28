import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MagicModule } from './magic/magic.module';

@Module({
  imports: [AuthModule, MagicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
