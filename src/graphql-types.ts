export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  movies: Array<Movie>;
  movie: Movie;
  lists: Array<List>;
  list?: Maybe<List>;
};


export type QueryMoviesArgs = {
  input: MoviesInput;
};


export type QueryMovieArgs = {
  input: MovieInput;
};


export type QueryListArgs = {
  input: ListInput;
};

export type MoviesInput = {
  page?: Maybe<Scalars['Int']>;
  query?: Maybe<Scalars['String']>;
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['ID'];
  title: Scalars['String'];
  overview: Scalars['String'];
  backdrop_path?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  vote_count?: Maybe<Scalars['Int']>;
  video?: Maybe<Scalars['Boolean']>;
  adult?: Maybe<Scalars['Boolean']>;
  original_title?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  vote_average?: Maybe<Scalars['Int']>;
  release_date?: Maybe<Scalars['String']>;
};

export type MovieInput = {
  id: Scalars['Int'];
};

export type List = {
  __typename?: 'List';
  id: Scalars['Int'];
  name: Scalars['String'];
  movies: Array<Maybe<Movie>>;
  user: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  lists: Array<Maybe<List>>;
  token: Scalars['String'];
};

export type ListInput = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: User;
  signin: User;
  createList?: Maybe<List>;
  addMovieToList: List;
};


export type MutationSignupArgs = {
  input: AuthInput;
};


export type MutationSigninArgs = {
  input: AuthInput;
};


export type MutationCreateListArgs = {
  input: CreateListInput;
};


export type MutationAddMovieToListArgs = {
  input: AddMovieToListInput;
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateListInput = {
  name: Scalars['String'];
};

export type AddMovieToListInput = {
  listId: Scalars['Int'];
  movieId: Scalars['Int'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

