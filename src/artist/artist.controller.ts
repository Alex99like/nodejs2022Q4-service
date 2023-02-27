import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ValidateUuidPipe } from '../pipes/ValidateUuidPipe';
import { ArtistDto } from './dto/artist.dto';
import { IArtist } from './types/artist.interface';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAll(): Promise<IArtist[]> {
    return this.artistService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ValidateUuidPipe) id: string): Promise<IArtist> {
    return this.artistService.getByIdArtist(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: ArtistDto): Promise<IArtist> {
    return this.artistService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ValidateUuidPipe) id: string,
    @Body() dto: ArtistDto,
  ): Promise<IArtist> {
    return this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ValidateUuidPipe) id: string): Promise<void> {
    return this.artistService.delete(id);
  }
}
