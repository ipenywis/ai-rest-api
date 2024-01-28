import { Body, Controller, Header, Post, UseGuards } from '@nestjs/common';
import { MagicDto } from './dto/magic.dto';
import { MagicService } from './magic.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { HttpService } from '@nestjs/axios';
import { tap } from 'rxjs';
import { createWriteStream } from 'fs';

@Controller()
export class MagicController {
  constructor(
    private magicService: MagicService,
    private httpService: HttpService,
  ) {}

  @Post('/magic-image')
  @UseGuards(AuthGuard)
  @Header('Content-Type', 'image/png')
  @Header('Content-Disposition', 'attachment; filename="magic-image.png"')
  async generateMagicImage(@Body() magicDto: MagicDto) {
    const generatedImageUrl = await this.magicService.generateMagicImage(
      magicDto,
    );

    this.httpService.get(generatedImageUrl, { responseType: 'stream' }).pipe(
      tap((response) => {
        response.data.pipe(createWriteStream('magic-image.png'));
      }),
    );

    return 'File Downloaded!';
  }
}
