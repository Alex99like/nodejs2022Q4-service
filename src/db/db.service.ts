import { Injectable } from '@nestjs/common';
import { IUser } from '../user/types/user.interface';
import { IArtist } from '../artist/types/artist.interface';
import { IAlbum } from '../album/types/album.interface';
import { Favorites } from '../favs/types/favs.interface';
import { ITrack } from '../track/types/track.interface';

@Injectable()
export class DbService {
  private readonly users: IUser[] = [];
  private readonly artists: IArtist[] = [];
  private readonly tracks: ITrack[] = [];
  private readonly albums: IAlbum[] = [];
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async saveUser(user: IUser) {
    this.users.push(user);
  }

  async updateUser(id: string, user: IUser) {
    const idx = this.users.findIndex((user) => user.id === id);
    this.users.splice(idx, 1, user);
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.users;
  }

  async getByKeyUser({
    key,
    prop,
  }: {
    key: keyof IUser;
    prop: string;
  }): Promise<IUser | null> {
    const user = this.users.find((el) => el[key] === prop);
    return user || null;
  }

  async deleteUser(id) {
    const idx = this.users.findIndex((user) => user.id === id);
    this.users.splice(idx, 1);
  }

  async getAllArtist(props?: { key: keyof IArtist; prop: string }) {
    if (props) {
      const { key, prop } = props;
      return this.artists.filter((el) => el[key] === prop);
    }
    return this.artists;
  }

  async getByKeyArtist({
    key,
    prop,
  }: {
    key: keyof IArtist;
    prop: string;
  }): Promise<IArtist | null> {
    const artist = this.artists.find((el) => el[key] === prop);
    return artist || null;
  }

  async saveArtist(artist: IArtist) {
    this.artists.push(artist);
  }

  async updateArtist(id: string, artist: IArtist) {
    const idx = this.artists.findIndex((user) => user.id === id);
    this.artists.splice(idx, 1, artist);
  }

  async deleteArtist(id: string) {
    const idx = this.artists.findIndex((user) => user.id === id);
    this.artists.splice(idx, 1);
  }

  async getAllAlbums(props?: { key: keyof IAlbum; prop: string }) {
    if (props) {
      const { key, prop } = props;
      return this.albums.filter((el) => el[key] === prop);
    }
    return this.albums;
  }

  async getByKeyAlbum({
    key,
    prop,
  }: {
    key: keyof IAlbum;
    prop: string;
  }): Promise<IAlbum | null> {
    const album = this.albums.find((el) => el[key] === prop);
    return album || null;
  }

  async saveAlbum(album: IAlbum) {
    this.albums.push(album);
  }

  async deleteAlbum(id: string) {
    const idx = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(idx, 1);
  }
  async updateAlbum(id: string, album: IAlbum) {
    const idx = this.albums.findIndex((user) => user.id === id);
    this.albums.splice(idx, 1, album);
  }

  async getAllTracks(props?: { key: keyof ITrack; prop: string }) {
    if (props) {
      const { key, prop } = props;
      return this.tracks.filter((el) => el[key] === prop);
    }
    return this.tracks;
  }

  async getByKeyTrack({
    key,
    prop,
  }: {
    key: keyof ITrack;
    prop: string;
  }): Promise<ITrack | null> {
    const track = this.tracks.find((el) => el[key] === prop);
    return track || undefined;
  }

  async saveTrack(album: ITrack) {
    this.tracks.push(album);
  }

  async deleteTrack(id: string) {
    const idx = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(idx, 1);
  }
  async updateTrack(id: string, track: ITrack) {
    const idx = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(idx, 1, track);
  }

  async getFavorites() {
    return this.favorites;
  }

  async addFavsAlbum(album: IAlbum) {
    this.favorites.albums.push(album);
  }

  async findFavsAlbum(albumId: string) {
    const album = this.favorites.albums.find((el) => el.id === albumId);
    return album || null;
  }

  async deleteFavsAlbum(albumId: string) {
    const idx = this.favorites.albums.findIndex((el) => el.id === albumId);
    this.favorites.albums.splice(idx, 1);
  }

  async addFavsArtist(artist: IArtist) {
    this.favorites.artists.push(artist);
  }

  async findFavsArtist(artistId: string) {
    const artist = this.favorites.artists.find((el) => el.id === artistId);
    return artist || null;
  }

  async deleteFavsArtist(artistId: string) {
    const idx = this.favorites.artists.findIndex((el) => el.id === artistId);
    this.favorites.artists.splice(idx, 1);
  }

  async addFavsTrack(track: ITrack) {
    this.favorites.tracks.push(track);
  }

  async findFavsTrack(trackId: string) {
    const track = this.favorites.tracks.find((el) => el.id === trackId);
    return track || null;
  }

  async deleteFavsTrack(trackId: string) {
    const idx = this.favorites.tracks.findIndex((el) => el.id === trackId);
    this.favorites.tracks.splice(idx, 1);
  }
}
