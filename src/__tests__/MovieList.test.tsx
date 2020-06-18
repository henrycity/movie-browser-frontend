import React from 'react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { render } from '@testing-library/react';
import { waitFor, fireEvent } from '@testing-library/dom';
import { Size } from 'react-virtualized-auto-sizer';

import MovieList from '../modules/Movie/Browser/MovieList';

jest.mock('react-virtualized-auto-sizer', () => ({ children }: { children: (size: Size) => React.ReactNode }) =>
  children({ height: 900, width: 900 }),
);

const server = setupServer(
  rest.get(`http://localhost:4000/api/movie`, (req, res, ctx) => {
    const page = req.url.searchParams.get('page');
    if (page === '1') {
      return res(
        ctx.json([
          {
            poster_path: '/avl9MEQhtvokNnzoWepkmHBZ2ss.jpg',
            id: 574982,
            backdrop_path: '/4phMeITqEnShF5C3ZD0Q8YQFMAB.jpg',
            title: 'The Blackout',
            overview:
              'No meteorites hit Earth, no terrorists put the world in danger, no atomic war was started, but something did go wrong. Contact between most towns on Earth has been severed. A small ring-like area in Eastern Europe still has electricity, and maybe even life is being reported from the Space. What military forces find outside the Ring is shocking. There are dead corpses everywhere: in stores, in cars, on roads, in hospitals and railway stations. Who or what is destroying all life on Earth? How long will the last outpost of mankind survive?',
          },
          {
            poster_path: '/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg',
            id: 454626,
            backdrop_path: '/ibMSQUtltvnmsOSrCsBrDNThzCu.jpg',
            title: 'Sonic the Hedgehog',
            overview:
              'Based on the global blockbuster videogame franchise from Sega, Sonic the Hedgehog tells the story of the world’s speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend team up to defend the planet from the evil genius Dr. Robotnik and his plans for world domination.',
          },
        ]),
      );
    } else {
      return res(
        ctx.json([
          {
            poster_path: '/ygCQnDEqUEIamBpdQdDYnFfxvgM.jpg',
            id: 339095,
            backdrop_path: '/t93doi7EzoqLFckidrGGnukFPwd.jpg',
            title: 'The Last Days of American Crime',
            overview:
              'In the not-too-distant future, where as a final response to crime and terrorism, the U.S. government plans to broadcast a signal that will make it impossible for anyone to knowingly break the law.',
          },
          {
            poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
            id: 496243,
            backdrop_path: '/ApiBzeaa95TNYliSbQ8pJv4Fje7.jpg',
            title: 'Parasite',
            overview:
              "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
          },
        ]),
      );
    }
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('render list', async () => {
  const { getByText, container } = render(<MovieList />);
  const scrollContainer = container.querySelector('.grid');
  await fireEvent.scroll(scrollContainer as Element, { target: { scrollY: 500 } });
  // TODO: Check how to mock MovieContext Provider due to useState hook
  await waitFor(() => {
    expect(true).toBeTruthy();
  });
});
