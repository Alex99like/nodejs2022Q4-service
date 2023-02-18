import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from '../entities/album.entity';
import { Repository } from 'typeorm';
import { AlbumDTO } from '../dto/album.dto';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAll() {
    return await this.albumRepository.find();
  }

  async getById(id: string) {
    return await this.albumRepository.findOne({ where: { id } });
  }

  async createAndUpdate(dto: AlbumDTO) {
    try {
      return await this.albumRepository.save(dto);
    } catch (e) {
      throw new BadRequestException('No Valid Body Request');
    }
  }

  async remove(id: string) {
    try {
      return await this.albumRepository.delete(id);
    } catch (e) {
      throw new BadRequestException('No Valid Body Request');
    }
  }
}
