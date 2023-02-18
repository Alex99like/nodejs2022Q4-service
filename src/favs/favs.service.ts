import { Injectable, NotFoundException } from '@nestjs/common';
import { UnprocessableException } from '../Error/Unprocessable.error';
import { ERROR_MSG_TRACK } from '../track/messages/error.message';
import {FavsRepository} from "./repositories/favs.repository";
import {ArtistRepository} from "../artist/repositories/artist.repository";
import {TrackRepository} from "../track/repositories/track.repository";
import {AlbumRepository} from "../album/repositories/album.repository";
import {ERROR_MSG_ALBUM} from "../album/messages/error.message";
import {ERROR_MSG_ARTIST} from "../artist/messages/error.message";

@Injectable()
export class FavsService {
  constructor(
    private readonly favsRepository: FavsRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly trackRepository: TrackRepository,
    private readonly albumRepository: AlbumRepository
  ) {}

  async getFavorites() {
    return await this.favsRepository.getAll();
  }

  async addTrack(trackId: string) {
    const track = await this.trackRepository.getById(trackId)

    if (!track) throw new UnprocessableException(ERROR_MSG_TRACK.NOT_FOUND);

    await this.favsRepository.addTrack(trackId);
  }

  async addAlbum(albumId: string) {
    const album = await this.albumRepository.getById(albumId)

    if (!album) throw new UnprocessableException(ERROR_MSG_ALBUM.NOT_FOUND);

    await this.favsRepository.addAlbum(albumId);
  }

  async addArtist(artistId: string) {

    const artist = await this.artistRepository.artistById(artistId)

    if (!artist) throw new UnprocessableException(ERROR_MSG_ARTIST.NOT_FOUND);

    await this.favsRepository.addArtist(artistId);
  }

  async remove(artistId: string) {
    const entity = await this.favsRepository.remove(artistId)

    if (!entity) throw new NotFoundException(ERROR_MSG_TRACK.NOT_FOUND);
  }
}
