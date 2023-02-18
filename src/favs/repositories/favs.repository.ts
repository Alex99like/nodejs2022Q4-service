import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FavsEntity, TypeFavs } from '../entities/favs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistRepository } from '../../artist/repositories/artist.repository';
import { AlbumRepository } from '../../album/repositories/album.repository';
import { TrackRepository } from '../../track/repositories/track.repository';
import { Favorites } from '../types/favs.interface';

@Injectable()
export class FavsRepository {
  constructor(
    @InjectRepository(FavsEntity)
    private readonly favsRepository: Repository<FavsEntity>,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly trackRepository: TrackRepository,
  ) {}

  async getAll() {
    const entities = await this.favsRepository.find();
    return await this.parseData(entities);
  }

  async parseData(entities: FavsEntity[]) {
    const res: Favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };

    for await (const entity of entities) {
      switch (entity.type) {
        case TypeFavs.ARTIST: {
          const artist = await this.artistRepository.artistById(entity.entity);
          res.artists.push(artist);
          break;
        }
        case TypeFavs.TRACK: {
          const track = await this.trackRepository.getById(entity.entity);
          res.tracks.push(track);
          break;
        }
        case TypeFavs.ALBUM: {
          const album = await this.albumRepository.getById(entity.entity);
          res.albums.push(album);
          break;
        }
      }
    }

    return res;
  }

  async addArtist(artistId: string) {
    const entity = this.favsRepository.create({
      type: TypeFavs.ARTIST,
      entity: artistId,
    });

    await this.favsRepository.save(entity);

    return await this.artistRepository.artistById(artistId);
  }

  async addTrack(trackId: string) {
    const entity = this.favsRepository.create({
      type: TypeFavs.TRACK,
      entity: trackId,
    });

    await this.favsRepository.save(entity);

    return await this.trackRepository.getById(trackId);
  }

  async addAlbum(albumId: string) {
    const entity = this.favsRepository.create({
      type: TypeFavs.ALBUM,
      entity: albumId,
    });

    await this.favsRepository.save(entity);

    return await this.albumRepository.getById(albumId);
  }

  async remove(entityId: string) {
    const entity = await this.favsRepository.findOne({
      where: { entity: entityId },
    });
    if (!entity) return null;

    return await this.favsRepository.delete(entity.id);
  }
}
