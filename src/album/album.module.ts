import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { DbModule } from '../db/db.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AlbumEntity} from "./entities/album.entity";
import {AlbumRepository} from "./repositories/album.repository";
import {ArtistEntity} from "../artist/entities/artist.entity";
import {FavsEntity} from "../favs/entities/favs.entity";
import {TrackEntity} from "../track/entities/track.entity";
import {ArtistService} from "../artist/artist.service";
import {FavsRepository} from "../favs/repositories/favs.repository";
import {ArtistRepository} from "../artist/repositories/artist.repository";
import {TrackRepository} from "../track/repositories/track.repository";

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([
    ArtistEntity,
    FavsEntity,
    AlbumEntity,
    TrackEntity
  ])],
  controllers: [AlbumController],
  providers: [
    AlbumService,
    FavsRepository,
    ArtistRepository,
    AlbumRepository,
    TrackRepository
  ],
})
export class AlbumModule {}
