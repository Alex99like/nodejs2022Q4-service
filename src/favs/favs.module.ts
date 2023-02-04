import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
