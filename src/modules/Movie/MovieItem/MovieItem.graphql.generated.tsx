import * as Types from '../../../graphql-types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type GetMovieQueryVariables = Types.Exact<{
  input: Types.MovieInput;
}>;


export type GetMovieQuery = (
  { __typename?: 'Query' }
  & { movie: (
    { __typename?: 'Movie' }
    & Pick<Types.Movie, 'id' | 'title' | 'backdrop_path' | 'poster_path' | 'overview'>
  ) }
);

export type GetListsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetListsQuery = (
  { __typename?: 'Query' }
  & { lists: Array<(
    { __typename?: 'List' }
    & Pick<Types.List, 'id' | 'name'>
    & { movies: Array<Types.Maybe<(
      { __typename?: 'Movie' }
      & Pick<Types.Movie, 'id'>
    )>> }
  )> }
);

export type AddMovieToListMutationVariables = Types.Exact<{
  input: Types.AddMovieToListInput;
}>;


export type AddMovieToListMutation = (
  { __typename?: 'Mutation' }
  & { addMovieToList: (
    { __typename?: 'List' }
    & Pick<Types.List, 'id' | 'name'>
    & { movies: Array<Types.Maybe<(
      { __typename?: 'Movie' }
      & Pick<Types.Movie, 'id'>
    )>> }
  ) }
);


export const GetMovieDocument = gql`
    query getMovie($input: MovieInput!) {
  movie(input: $input) {
    id
    title
    backdrop_path
    poster_path
    overview
  }
}
    `;

/**
 * __useGetMovieQuery__
 *
 * To run a query within a React component, call `useGetMovieQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMovieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMovieQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMovieQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMovieQuery, GetMovieQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMovieQuery, GetMovieQueryVariables>(GetMovieDocument, baseOptions);
      }
export function useGetMovieLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMovieQuery, GetMovieQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMovieQuery, GetMovieQueryVariables>(GetMovieDocument, baseOptions);
        }
export type GetMovieQueryHookResult = ReturnType<typeof useGetMovieQuery>;
export type GetMovieLazyQueryHookResult = ReturnType<typeof useGetMovieLazyQuery>;
export type GetMovieQueryResult = ApolloReactCommon.QueryResult<GetMovieQuery, GetMovieQueryVariables>;
export const GetListsDocument = gql`
    query getLists {
  lists {
    id
    name
    movies {
      id
    }
  }
}
    `;

/**
 * __useGetListsQuery__
 *
 * To run a query within a React component, call `useGetListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetListsQuery, GetListsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetListsQuery, GetListsQueryVariables>(GetListsDocument, baseOptions);
      }
export function useGetListsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetListsQuery, GetListsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetListsQuery, GetListsQueryVariables>(GetListsDocument, baseOptions);
        }
export type GetListsQueryHookResult = ReturnType<typeof useGetListsQuery>;
export type GetListsLazyQueryHookResult = ReturnType<typeof useGetListsLazyQuery>;
export type GetListsQueryResult = ApolloReactCommon.QueryResult<GetListsQuery, GetListsQueryVariables>;
export const AddMovieToListDocument = gql`
    mutation addMovieToList($input: AddMovieToListInput!) {
  addMovieToList(input: $input) {
    id
    name
    movies {
      id
    }
  }
}
    `;

/**
 * __useAddMovieToListMutation__
 *
 * To run a mutation, you first call `useAddMovieToListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMovieToListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMovieToListMutation, { data, loading, error }] = useAddMovieToListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMovieToListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddMovieToListMutation, AddMovieToListMutationVariables>) {
        return ApolloReactHooks.useMutation<AddMovieToListMutation, AddMovieToListMutationVariables>(AddMovieToListDocument, baseOptions);
      }
export type AddMovieToListMutationHookResult = ReturnType<typeof useAddMovieToListMutation>;
export type AddMovieToListMutationResult = ApolloReactCommon.MutationResult<AddMovieToListMutation>;
export type AddMovieToListMutationOptions = ApolloReactCommon.BaseMutationOptions<AddMovieToListMutation, AddMovieToListMutationVariables>;