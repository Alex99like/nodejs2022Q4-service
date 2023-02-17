import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ArtistEntity} from "../entities/artist.entity";
import {ArtistDto} from "../dto/artist.dto";

@Injectable()
export class ArtistRepository {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>
  ) {}

  async artistById(id: string) {
    return await this.artistRepository.findOne({ where: { id } });
  }

  async getAll() {
    return await this.artistRepository.find()
  }

  async createAndUpdate(dto: ArtistDto) {
    try {
      return await this.artistRepository.save(dto)
    } catch (e) {
      throw new BadRequestException("No Valid Body Request")
    }
  }

  async remove(id: string) {
    try {
      return await this.artistRepository.delete(id)
    } catch (e) {
      throw new BadRequestException("No Valid Body Request")
    }
  }
}