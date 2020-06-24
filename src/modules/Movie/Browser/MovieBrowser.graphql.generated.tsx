import * as Types from '../../../graphql-types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type GetMoviesQueryVariables = Types.Exact<{
  input: Types.MoviesInput;
}>;


export type GetMoviesQuery = (
  { __typename?: 'Query' }
  & { movies: Array<(
    { __typename?: 'Movie' }
    & Pick<Types.Movie, 'id' | 'title' | 'backdrop_path' | 'poster_path'>
  )> }
);

export type CreateListMutationVariables = Types.Exact<{
  input: Types.CreateListInput;
}>;


export type CreateListMutation = (
  { __typename?: 'Mutation' }
  & { createList?: Types.Maybe<(
    { __typename?: 'List' }
    & Pick<Types.List, 'id' | 'name'>
    & { movies: Array<Types.Maybe<(
      { __typename?: 'Movie' }
      & Pick<Types.Movie, 'id'>
    )>> }
  )> }
);


export const GetMoviesDocument = gql`
    query getMovies($input: MoviesInput!) {
  movies(input: $input) {
    id
    title
    backdrop_path
    poster_path
  }
}
    `;

/**
 * __useGetMoviesQuery__
 *
 * To run a query within a React component, call `useGetMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMoviesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMoviesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMoviesQuery, GetMoviesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMoviesQuery, GetMoviesQueryVariables>(GetMoviesDocument, baseOptions);
      }
export function useGetMoviesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMoviesQuery, GetMoviesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMoviesQuery, GetMoviesQueryVariables>(GetMoviesDocument, baseOptions);
        }
export type GetMoviesQueryHookResult = ReturnType<typeof useGetMoviesQuery>;
export type GetMoviesLazyQueryHookResult = ReturnType<typeof useGetMoviesLazyQuery>;
export type GetMoviesQueryResult = ApolloReactCommon.QueryResult<GetMoviesQuery, GetMoviesQueryVariables>;
export const CreateListDocument = gql`
    mutation createList($input: CreateListInput!) {
  createList(input: $input) {
    id
    name
    movies {
      id
    }
  }
}
    `;

/**
 * __useCreateListMutation__
 *
 * To run a mutation, you first call `useCreateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListMutation, { data, loading, error }] = useCreateListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateListMutation, CreateListMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateListMutation, CreateListMutationVariables>(CreateListDocument, baseOptions);
      }
export type CreateListMutationHookResult = ReturnType<typeof useCreateListMutation>;
export type CreateListMutationResult = ApolloReactCommon.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateListMutation, CreateListMutationVariables>;