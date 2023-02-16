import {Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinTable, PrimaryColumn} from "typeorm";
import {IArtist} from "../../artist/types/artist.interface";
import {IAlbum} from "../../album/types/album.interface";
import {ITrack} from "../../track/types/track.interface";
import {ArtistEntity} from "../../artist/entities/artist.entity";

export enum TypeFavs {
  ARTIST = "artist",
  TRACK = "track",
  ALBUM = "album",
}

@Entity()
export class FavsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: "enum",
    enum: TypeFavs
  })
  type: TypeFavs

  @Column()
  entity: string
}