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
import { AlbumService } from './album.service';
import { ValidateUuidPipe } from '../pipes/ValidateUuidPipe';
import { AlbumDTO } from './dto/album.dto';
import { IAlbum } from './types/album.interface';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAll(): Promise<IAlbum[]> {
    return this.albumService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ValidateUuidPipe) id: string): Promise<IAlbum> {
    return this.albumService.getByIdAlbum(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: AlbumDTO): Promise<IAlbum> {
    return this.albumService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ValidateUuidPipe) id: string,
    @Body() dto: AlbumDTO,
  ): Promise<IAlbum> {
    return this.albumService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ValidateUuidPipe) id: string): Promise<void> {
    return this.albumService.delete(id);
  }
}
