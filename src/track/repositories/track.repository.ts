import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from '../entities/track.entity';
import { Repository } from 'typeorm';
import { TrackDto } from '../dto/track.dto';
import { ITrack } from '../types/track.interface';

@Injectable()
export class TrackRepository {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll(option?: { tag: keyof ITrack; id: string }) {
    if (option) {
      return await this.trackRepository.find({
        where: { [option.tag]: option.id },
      });
    }
    return await this.trackRepository.find();
  }

  async getById(id: string) {
    return await this.trackRepository.findOne({ where: { id } });
  }

  async createAndUpdate(dto: TrackDto) {
    try {
      return await this.trackRepository.save(dto);
    } catch (e) {
      throw new BadRequestException('No Valid Body Request');
    }
  }

  async remove(id: string) {
    try {
      return await this.trackRepository.delete(id);
    } catch (e) {
      throw new BadRequestException('No Valid Body Request');
    }
  }
}
