import {Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TrackEntity} from "../../track/entities/track.entity";
import {ArtistEntity} from "../../artist/entities/artist.entity";

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ default: null })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks)
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.album)
  @JoinTable()
  tracks: TrackEntity[];
}