import { tblMovieActorMapping } from './tblMovieActorMapping';
import { tblMovieDirectorMapping } from './tblMovieDirectorMapping';

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
    tblMovieActorMapping: tblMovieActorMapping[];
    tblMovieDirectorMapping: tblMovieDirectorMapping[];
}
