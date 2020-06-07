import { createContext, Dispatch, SetStateAction } from 'react';
import { Movie } from '../../types';

const MovieContext = createContext<[Movie[], Dispatch<SetStateAction<Movie[]>>]>([[], () => {}]);

export default MovieContext;
