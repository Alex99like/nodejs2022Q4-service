import { IArtist } from '../../artist/types/artist.interface';
import { IAlbum } from '../../album/types/album.interface';
import { ITrack } from '../../track/types/track.interface';

export interface Favorites {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
