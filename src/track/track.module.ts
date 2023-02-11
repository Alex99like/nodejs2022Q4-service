import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DbModule } from '../db/db.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TrackEntity} from "./entities/track.entity";

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([TrackEntity])],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
