import React from 'react';

import { MemoryRouter, Route } from 'react-router';
import { render } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { waitFor } from '@testing-library/dom';

import MovieInformation from '../modules/Movie/MovieItem/MovieInformation';

export const renderWithRouter = (Component: React.ComponentType<any>) =>
  render(
    <MemoryRouter initialEntries={['movie/123']}>
      <Route path="movie/:movieId" component={Component} />
    </MemoryRouter>,
  );

const server = setupServer(
  rest.get(`http://localhost:4000/api/movie/123`, (req, res, ctx) => {
    return res(
      ctx.json({
        adult: false,
        backdrop_path: '/5myQbDzw3l8K9yofUXRJ4UTVgam.jpg',
        id: 123,
        overview:
          'Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.',
        poster_path: '/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg',
        title: 'Spider-Man: Far from Home',
      }),
    );
  }),
);

test('render progress bar when movie is not loaded', () => {
  const { getByRole } = renderWithRouter(MovieInformation);
  expect(getByRole('progressbar')).toBeInTheDocument();
});

test('render movie information', async () => {
  server.listen();
  const { getByText } = renderWithRouter(MovieInformation);
  await waitFor(() => {
    expect(getByText(/Spider-Man/)).toBeInTheDocument();
  });
  server.close();
});
