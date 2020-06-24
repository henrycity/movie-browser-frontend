import React, { CSSProperties, useEffect, useCallback } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import { css } from '@emotion/core';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import useMovies from './hooks';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const COLUMN_COUNT = 4;

interface MovieListProps {
  query: string;
}

const MovieList: React.FunctionComponent<MovieListProps> = ({ query }) => {
  const { movies, loadMovies } = useMovies();

  const debounceSearch = useCallback(debounce(loadMovies, 500), []);

  useEffect(() => {
    debounceSearch(query);
  }, [query, debounceSearch]);

  const loadMoreItems = async () => {
    loadMovies(query);
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
              width: 475px;
              height: 275px;
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
