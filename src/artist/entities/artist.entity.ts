import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {FavsEntity} from "../../favs/entities/favs.entity";
import {JoinColumn} from "typeorm/browser";

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}