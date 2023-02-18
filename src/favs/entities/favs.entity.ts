import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TypeFavs {
  ARTIST = 'artist',
  TRACK = 'track',
  ALBUM = 'album',
}

@Entity()
export class FavsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TypeFavs,
  })
  type: TypeFavs;

  @Column()
  entity: string;
}
