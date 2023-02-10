import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DbModule } from '../db/db.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArtistEntity} from "./entities/artist.entity";

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([ArtistEntity])],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
