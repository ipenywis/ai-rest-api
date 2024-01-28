import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class MagicDto {
  @IsString()
  prompt: string;

  @IsString()
  base64_img: string;
}
