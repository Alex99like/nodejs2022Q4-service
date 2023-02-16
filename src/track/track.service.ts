import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { TrackDto } from './dto/track.dto';
import { v4 } from 'uuid';
import { ERROR_MSG_TRACK } from './messages/error.message';
import { ITrack } from './types/track.interface';
import {TrackRepository} from "./repositories/track.repository";
import {FavsRepository} from "../favs/repositories/favs.repository";

@Injectable()
export class TrackService {
  constructor(
    //private readonly dbService: DbService,
    private readonly trackRepository: TrackRepository,
    private readonly favsRepository: FavsRepository
  ) {}

  async getAll(): Promise<ITrack[]> {
    return await this.trackRepository.getAll();
  }

  async getById(id: string): Promise<ITrack> {
    const track = await this.trackRepository.getById(id);

    if (!track) {
      throw new NotFoundException(ERROR_MSG_TRACK.NOT_FOUND);
    }

    return track;
  }

  async create(dto: TrackDto): Promise<ITrack> {
    //!!! Test Error Album and Artist
    //await this.checkArtist(dto.artistId)
    //await this.checkAlbum(dto.albumId)

    const newTrack: ITrack = {
      id: v4(),
      ...dto,
    };

    return this.trackRepository.createAndUpdate(newTrack);
  }

  async update(id: string, dto: TrackDto): Promise<ITrack> {
    const track = await this.getById(id);

    //await this.checkArtist(dto.artistId)
    //await this.checkAlbum(dto.albumId)

    const newTrack: ITrack = {
      ...track,
      ...dto,
    };

    return this.trackRepository.createAndUpdate(newTrack);
  }

  async delete(id: string): Promise<void> {
    const track = await this.getById(id);
    await this.changeFavs(track.id);

    await this.trackRepository.remove(track.id);
  }

  //async checkArtist(id: string): Promise<void> {
  //  if (id !== null) {
  //    const artist = await this.dbService.getByKeyArtist({
  //      key: 'id',
  //      prop: id,
  //    });
  //    if (artist) throw new BadRequestException(ERROR_MSG_ARTIST.NOT_FOUND);
  //  }
  //}

  //async checkAlbum(id: string): Promise<void> {
  //  if (id !== null) {
  //    const album = await this.dbService.getByKeyAlbum({ key: 'id', prop: id });
  //    if (album) throw new BadRequestException(ERROR_MSG_ALBUM.NOT_FOUND);
  //  }
  //}

  async changeFavs(trackId: string): Promise<void> {
    await this.favsRepository.remove(trackId)
  }
}
