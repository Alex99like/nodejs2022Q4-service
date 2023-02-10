import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {UserEntity} from "../user/entities/user.entity";
import {ArtistEntity} from "../artist/entities/artist.entity";
import {TrackEntity} from "../track/entities/track.entity";
import {AlbumEntity} from "../album/entities/album.entity";

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: '123456',
  username: 'postgres',
  database: 'service',
  entities: [ArtistEntity, UserEntity, TrackEntity, AlbumEntity],
  //entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
}