import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UnprocessableException } from '../Error/Unprocessable.error';
import { ERROR_MSG_TRACK } from '../track/messages/error.message';

@Injectable()
export class FavsService {
  constructor(private readonly dbService: DbService) {}

  async getFavorites() {
    return await this.dbService.getFavorites();
  }

  async addTrack(trackId: string) {
    const track = await this.dbService.getByKeyTrack({
      key: 'id',
      prop: trackId,
    });

    if (!track) throw new UnprocessableException(ERROR_MSG_TRACK.NOT_FOUND);

    await this.dbService.addFavsTrack(track);
  }

  async removeTrack(trackId: string) {
    const track = await this.dbService.findFavsTrack(trackId);

    if (!track) throw new NotFoundException(ERROR_MSG_TRACK.NOT_FOUND);

    await this.dbService.deleteFavsTrack(track.id);
  }

  async addAlbum(albumId: string) {
    const album = await this.dbService.getByKeyAlbum({
      key: 'id',
      prop: albumId,
    });

    if (!album) throw new UnprocessableException(ERROR_MSG_TRACK.NOT_FOUND);

    await this.dbService.addFavsAlbum(album);
  }

  async removeAlbum(albumId: string) {
    const album = await this.dbService.findFavsAlbum(albumId);

    if (!album) throw new NotFoundException(ERROR_MSG_TRACK.NOT_FOUND);

    await this.dbService.deleteFavsAlbum(album.id);
  }

  async addArtist(artistId: string) {
    const artist = await this.dbService.getByKeyArtist({
      key: 'id',
      prop: artistId,
    });

    if (!artist) throw new UnprocessableException(ERROR_MSG_TRACK.NOT_FOUND);

    await this.dbService.addFavsArtist(artist);
  }

  async removeArtist(artistId: string) {
    const artist = await this.dbService.findFavsArtist(artistId);

    if (!artist) throw new NotFoundException(ERROR_MSG_TRACK.NOT_FOUND);

    await this.dbService.deleteFavsArtist(artist.id);
  }
}
