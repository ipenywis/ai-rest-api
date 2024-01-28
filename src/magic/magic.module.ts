import { Module } from '@nestjs/common';
import { MagicService } from './magic.service';
import { MagicController } from './magic.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/db/db.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [MagicService],
  exports: [],
  controllers: [MagicController],
  imports: [AuthModule, DatabaseModule, HttpModule],
})
export class MagicModule {}
