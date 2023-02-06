import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
