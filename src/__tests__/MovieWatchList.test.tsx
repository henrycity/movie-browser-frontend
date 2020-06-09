import React from 'react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';

import MovieWatchList from '../modules/Movie/MovieWatchList';

const server = setupServer(
  rest.get(`http://localhost:4000/api/list`, (req, res, ctx) => {
    return res(ctx.json({ favorite: [{ userId: 9, movieId: '454626', listName: 'favorite', userRating: null }] }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('render watchlist', async () => {
  const { getByText } = render(<MovieWatchList />);
  await waitFor(() => {
    expect(getByText('favorite')).toBeInTheDocument();
  });
});
