import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumDTO } from './dto/album.dto';
import { v4 } from 'uuid';
import { IAlbum } from './types/album.interface';
import { ERROR_MSG_ALBUM } from './messages/error.message';
import { ERROR_MSG_ARTIST } from '../artist/messages/error.message';
import { AlbumRepository } from './repositories/album.repository';
import { FavsRepository } from '../favs/repositories/favs.repository';
import { TrackRepository } from '../track/repositories/track.repository';
import { ArtistRepository } from '../artist/repositories/artist.repository';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly favsRepository: FavsRepository,
    private readonly trackRepository: TrackRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  async getById(id: string): Promise<IAlbum | null> {
    const album = await this.albumRepository.getById(id);

    return album ? album : null;
  }

  async getAll(): Promise<IAlbum[]> {
    return await this.albumRepository.getAll();
  }

  async getByIdAlbum(id: string): Promise<IAlbum> {
    const album = await this.getById(id);

    if (!album) {
      throw new NotFoundException(ERROR_MSG_ALBUM.NOT_FOUND);
    }
    return album;
  }

  async create(dto: AlbumDTO): Promise<IAlbum> {
    await this.checkArtist(dto.artistId);

    const newAlbum: IAlbum = {
      id: v4(),
      ...dto,
    };

    return await this.albumRepository.createAndUpdate(newAlbum);
  }

  async update(id: string, dto: AlbumDTO): Promise<IAlbum> {
    const album = await this.getByIdAlbum(id);

    await this.checkArtist(album.artistId);

    const newUser: IAlbum = {
      ...album,
      ...dto,
    };

    return await this.albumRepository.createAndUpdate(newUser);
  }

  async delete(id: string): Promise<void> {
    const album = await this.getByIdAlbum(id);

    await this.changeTrack(album);
    await this.changeFavs(album.id);

    await this.albumRepository.remove(album.id);
  }

  async checkArtist(id: string | null): Promise<void> {
    if (id !== null) {
      const artist = await this.artistRepository.artistById(id);

      if (!artist) throw new BadRequestException(ERROR_MSG_ARTIST.NOT_FOUND);
    }
  }

  async changeTrack(album: IAlbum): Promise<void> {
    const tracks = await this.trackRepository.getAll({
      tag: 'albumId',
      id: album.id,
    });
    for await (const track of tracks) {
      await this.trackRepository.createAndUpdate({ ...track, albumId: null });
    }
  }

  async changeFavs(albumId: string): Promise<void> {
    await this.favsRepository.remove(albumId);
  }
}
