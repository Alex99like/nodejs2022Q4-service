import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { ArtistDto } from './dto/artist.dto';
import { IArtist } from './types/artist.interface';
import { v4 } from 'uuid';
import { ERROR_MSG_ARTIST } from './messages/error.message';
import {Repository} from "typeorm";
import {ArtistEntity} from "./entities/artist.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ArtistService {
  constructor(
    private readonly dbService: DbService,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>
  ) {}

  async getById(id: string): Promise<IArtist | null> {
    //const artist = await this.dbService.getByKeyArtist({ key: 'id', prop: id });
    const artist = await this.artistRepository.findOne({ where: { id } });

    return artist ? artist : null;
  }

  async getAll(): Promise<IArtist[]> {
    return this.artistRepository.find();
  }

  async getByIdArtist(id: string): Promise<IArtist> {
    const artist = await this.getById(id);

    if (!artist) {
      throw new NotFoundException(ERROR_MSG_ARTIST.NOT_FOUND);
    }

    return artist;
  }

  async create(dto: ArtistDto): Promise<IArtist> {
    const newArtist: IArtist = {
      id: v4(),
      ...dto,
    };

    return this.artistRepository.save(newArtist);
  }

  async update(id: string, dto: ArtistDto): Promise<IArtist> {
    const artist = await this.getByIdArtist(id);

    const newArtist: IArtist = {
      ...artist,
      ...dto,
    };

    await this.artistRepository.save(newArtist);

    return newArtist;
  }

  async delete(id: string): Promise<void> {
    const artist = await this.getByIdArtist(id);

    await this.changeTrack(artist);
    await this.changeFavs(artist.id);

    await this.artistRepository.delete(id);
  }

  async changeTrack(artist: IArtist): Promise<void> {
    const tracks = await this.dbService.getAllTracks({
      key: 'artistId',
      prop: artist.id,
    });

    for await (const track of tracks) {
      await this.dbService.updateTrack(track.id, { ...track, artistId: null });
    }
  }

  async changeFavs(artistId: string): Promise<void> {
    const artist = await this.dbService.findFavsArtist(artistId);
    if (artist) await this.dbService.deleteFavsArtist(artist.id);
  }
}
