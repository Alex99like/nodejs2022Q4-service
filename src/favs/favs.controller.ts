import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavsService } from './favs.service';
import { ValidateUuidPipe } from '../pipes/ValidateUuidPipe';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async getFavorites() {
    return this.favsService.getFavorites();
  }

  @Post('track/:id')
  async addTrack(@Param('id', ValidateUuidPipe) id: string) {
   return this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', ValidateUuidPipe) id: string) {
    return this.favsService.remove(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', ValidateUuidPipe) id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', ValidateUuidPipe) id: string) {
    return this.favsService.remove(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id', ValidateUuidPipe) id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', ValidateUuidPipe) id: string) {
    return this.favsService.remove(id);
  }
}
