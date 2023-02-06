import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { AlbumDTO } from './dto/album.dto';
import { v4 } from 'uuid';
import { IAlbum } from './types/album.interface';
import { ERROR_MSG_ALBUM } from './messages/error.message';
import { ERROR_MSG_ARTIST } from '../artist/messages/error.message';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DbService) {}

  async getById(id: string): Promise<IAlbum | null> {
    const album = await this.dbService.getByKeyAlbum({ key: 'id', prop: id });

    return album ? album : null;
  }

  async getAll(): Promise<IAlbum[]> {
    return this.dbService.getAllAlbums();
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

    await this.dbService.saveAlbum(newAlbum);

    return newAlbum;
  }

  async update(id: string, dto: AlbumDTO): Promise<IAlbum> {
    const album = await this.getByIdAlbum(id);

    await this.checkArtist(album.artistId);

    const newUser: IAlbum = {
      ...album,
      ...dto,
    };

    await this.dbService.updateAlbum(album.id, newUser);

    return newUser;
  }

  async delete(id: string): Promise<void> {
    const album = await this.getByIdAlbum(id);

    await this.changeTrack(album);
    await this.changeFavs(album.id);

    await this.dbService.deleteAlbum(album.id);
  }

  async checkArtist(id: string | null): Promise<void> {
    if (id !== null) {
      const artist = await this.dbService.getByKeyArtist({
        key: 'id',
        prop: id,
      });

      if (!artist) throw new BadRequestException(ERROR_MSG_ARTIST.NOT_FOUND);
    }
  }

  async changeTrack(artist: IAlbum): Promise<void> {
    const tracks = await this.dbService.getAllTracks({
      key: 'albumId',
      prop: artist.id,
    });

    for await (const track of tracks) {
      await this.dbService.updateTrack(track.id, { ...track, albumId: null });
    }
  }

  async changeFavs(albumId: string): Promise<void> {
    const album = await this.dbService.findFavsAlbum(albumId);
    if (album) await this.dbService.deleteFavsAlbum(album.id);
  }
}
