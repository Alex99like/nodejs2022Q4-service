import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AlbumDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null;
}
