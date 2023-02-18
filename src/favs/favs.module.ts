import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FavsEntity} from "./entities/favs.entity";
import {FavsRepository} from "./repositories/favs.repository";
import {ArtistRepository} from "../artist/repositories/artist.repository";
import {ArtistEntity} from "../artist/entities/artist.entity";
import {AlbumRepository} from "../album/repositories/album.repository";
import {TrackRepository} from "../track/repositories/track.repository";
import {TrackEntity} from "../track/entities/track.entity";
import {AlbumEntity} from "../album/entities/album.entity";

@Module({
  imports: [TypeOrmModule.forFeature([
    FavsEntity,
    ArtistEntity,
    TrackEntity,
    AlbumEntity
  ])],
  providers: [
    FavsService,
    FavsRepository,
    ArtistRepository,
    AlbumRepository,
    TrackRepository
  ],
  controllers: [FavsController],
})
export class FavsModule {}
