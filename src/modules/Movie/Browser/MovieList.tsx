import React, { useState, CSSProperties, Dispatch, SetStateAction, useEffect, useCallback } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import { css } from '@emotion/core';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import axios from '../../../utils/axios';
import { Movie } from '../../../types';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const COLUMN_COUNT = 4;

interface MovieListProps {
  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[]>>;
  query: string;
}

const MovieList: React.FunctionComponent<MovieListProps> = ({ movies, setMovies, query }) => {
  const [page, setPage] = useState(1);

  const search = async (query: string, page = 1, startIndex = 0) => {
    return axios.get(`api/movie?query=${query}&page=${page}`).then(({ data }) => {
      setPage((page) => page + 1);
      setMovies((prevItems) => [...prevItems, ...data]);
    });
  };

  const debounceSearch = useCallback(debounce(search, 500), []);

  useEffect(() => {
    setPage(1);
    debounceSearch(query);
  }, [query, debounceSearch]);

  const loadMoreItems = async (startIndex: number, stopIndex: number) => {
    // Avoid duplicate call in useEffect when component first renders
    if (page !== 1) {
      await search(query, page, startIndex);
    }
  };
  // If there are more items to be loaded then add two extra rows to hold a loading indicator.
  const itemCount = movies.length + COLUMN_COUNT * 2;

  // Every row is loaded except for loading indicator row.
  const isItemLoaded = (index: number) => index < movies.length;

  // Render an item or a loading indicator.
  const Item = ({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: CSSProperties }) => {
    let label;
    const itemIndex = rowIndex * COLUMN_COUNT + columnIndex;
    const item = movies[itemIndex];
    if (item) {
      const picturePath = item.backdrop_path || item.poster_path || '';
      label = (
        <Link to={`/movie/${item.id}`}>
          <img
            css={css`
              width: 95%;
              height: 95%;
            `}
            alt={item.title}
            src={`${IMAGE_URL}${picturePath}`}
          />
        </Link>
      );
    } else {
      label = <CircularProgress />;
    }
    return (
      <div
        style={style}
        // style is an object that cannot be used with css of emotion
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {label}
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader isItemLoaded={isItemLoaded} loadMoreItems={loadMoreItems} itemCount={itemCount}>
          {({ onItemsRendered, ref }) => (
            <Grid
              className="grid"
              css={css`
                display: flex;
                justify-content: center;

                div {
                  position: relative;
                }
              `}
              columnCount={COLUMN_COUNT}
              columnWidth={500}
              height={height}
              rowCount={itemCount}
              rowHeight={300}
              onItemsRendered={(gridProps) => {
                onItemsRendered({
                  overscanStartIndex: gridProps.overscanRowStartIndex * COLUMN_COUNT,
                  overscanStopIndex: gridProps.overscanRowStopIndex * COLUMN_COUNT,
                  visibleStartIndex: gridProps.visibleRowStartIndex * COLUMN_COUNT,
                  visibleStopIndex: gridProps.visibleRowStopIndex * COLUMN_COUNT,
                });
              }}
              ref={ref}
              width={width}
            >
              {Item}
            </Grid>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};

export default MovieList;
