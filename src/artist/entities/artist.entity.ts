import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackEntity } from '../../track/entities/track.entity';
import { AlbumEntity } from '../../album/entities/album.entity';

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => TrackEntity, (track) => track.artist)
  @JoinTable()
  tracks: TrackEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  @JoinTable()
  album: TrackEntity[];
}
