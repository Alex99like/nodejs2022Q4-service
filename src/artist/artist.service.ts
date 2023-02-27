import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { IArtist } from './types/artist.interface';
import { v4 } from 'uuid';
import { ERROR_MSG_ARTIST } from './messages/error.message';
import { ArtistRepository } from './repositories/artist.repository';
import { FavsRepository } from '../favs/repositories/favs.repository';
import { TrackRepository } from '../track/repositories/track.repository';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly favsRepository: FavsRepository,
    private readonly trackRepository: TrackRepository,
  ) {}

  async getById(id: string): Promise<IArtist | null> {
    const artist = await this.artistRepository.artistById(id);

    return artist ? artist : null;
  }

  async getAll(): Promise<IArtist[]> {
    return this.artistRepository.getAll();
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

    return await this.artistRepository.createAndUpdate(newArtist);
  }

  async update(id: string, dto: ArtistDto): Promise<IArtist> {
    const artist = await this.getByIdArtist(id);

    const newArtist: IArtist = {
      ...artist,
      ...dto,
    };

    return await this.artistRepository.createAndUpdate(newArtist);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.getByIdArtist(id);

    await this.changeTrack(artist);
    await this.changeFavs(artist.id);

    await this.artistRepository.remove(id);
  }

  async changeTrack(artist: IArtist): Promise<void> {
    const tracks = await this.trackRepository.getAll({
      tag: 'artistId',
      id: artist.id,
    });

    for await (const track of tracks) {
      await this.trackRepository.createAndUpdate({ ...track, artistId: null });
    }
  }

  async changeFavs(artistId: string): Promise<void> {
    await this.favsRepository.remove(artistId);
  }
}
