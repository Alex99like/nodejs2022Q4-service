import {Injectable} from "@nestjs/common";
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
    return await this.artistRepository.save(dto)
  }

  async remove(id: string) {
    return await this.artistRepository.delete(id)
  }
}