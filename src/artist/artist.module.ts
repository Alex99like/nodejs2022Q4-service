import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { ArtistRepository } from './repositories/artist.repository';
import { FavsEntity } from '../favs/entities/favs.entity';
import { FavsRepository } from '../favs/repositories/favs.repository';
import { AlbumEntity } from '../album/entities/album.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { AlbumRepository } from '../album/repositories/album.repository';
import { TrackRepository } from '../track/repositories/track.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArtistEntity,
      FavsEntity,
      AlbumEntity,
      TrackEntity,
    ]),
  ],
  providers: [
    ArtistService,
    FavsRepository,
    ArtistRepository,
    AlbumRepository,
    TrackRepository,
  ],
  controllers: [ArtistController],
})
export class ArtistModule {}
