import { IArtist } from '../../artist/types/artist.interface';
import { IAlbum } from '../../album/types/album.interface';

export interface Favorites {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
