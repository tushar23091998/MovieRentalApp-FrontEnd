import { Actor } from './actor';
import { Director } from './director';

export interface tblMovie {
    aMovieId: number;
    aTitle: string;
    aMovieDescription: string;
    aDuration: string;
    aPrice: string;
    aPurchasePrice: string;
    aRating: number;
    aImageLink: string;
    aTrailerLink: string;
    aGenre: string;
    aWideImage: string;
    actorMapping: Actor[];
    directorMapping: Director[];
}
