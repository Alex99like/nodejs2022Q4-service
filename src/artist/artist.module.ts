import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
