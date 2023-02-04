import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
