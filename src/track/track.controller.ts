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

import { ValidateUuidPipe } from '../pipes/ValidateUuidPipe';
import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';
import { ITrack } from './types/track.interface';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAll(): Promise<ITrack[]> {
    return this.trackService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ValidateUuidPipe) id: string): Promise<ITrack> {
    return this.trackService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: TrackDto): Promise<ITrack> {
    return this.trackService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ValidateUuidPipe) id: string,
    @Body() dto: TrackDto,
  ): Promise<ITrack> {
    return this.trackService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ValidateUuidPipe) id: string): Promise<void> {
    return this.trackService.delete(id);
  }
}
