import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../user/entities/user.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { FavsEntity } from '../favs/entities/favs.entity';

export const entities = [
  ArtistEntity,
  UserEntity,
  TrackEntity,
  AlbumEntity,
  FavsEntity,
];

// export const config: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   password: '123456',
//   username: 'postgres',
//   database: 'service',
//   entities: [ArtistEntity, UserEntity, TrackEntity, AlbumEntity, FavsEntity],
//   synchronize: true
// }

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  database: configService.get('DB_NAME'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  entities: entities,
  autoLoadEntities: true,
  synchronize: true,
});
