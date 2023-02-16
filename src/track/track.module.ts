import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DbModule } from '../db/db.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TrackEntity} from "./entities/track.entity";
import {TrackRepository} from "./repositories/track.repository";
import {ArtistEntity} from "../artist/entities/artist.entity";
import {FavsEntity} from "../favs/entities/favs.entity";
import {AlbumEntity} from "../album/entities/album.entity";
import {FavsRepository} from "../favs/repositories/favs.repository";
import {ArtistRepository} from "../artist/repositories/artist.repository";
import {AlbumRepository} from "../album/repositories/album.repository";

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([
    ArtistEntity,
    FavsEntity,
    AlbumEntity,
    TrackEntity
  ])],
  providers: [
    TrackService,
    FavsRepository,
    ArtistRepository,
    AlbumRepository,
    TrackRepository
  ],
  controllers: [TrackController],
})
export class TrackModule {}
