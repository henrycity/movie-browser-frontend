import React, { useState, CSSProperties, useContext } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import { css } from '@emotion/core';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

import axios from '../../utils/axios';
import { ItemStatusMap } from '../../types';
import MovieContext from './MovieContext';

let itemStatusMap: ItemStatusMap = {};

const LOADED = true;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const COLUMN_COUNT = 4;

const grid = css`
  display: flex;
  justify-content: center;

  div {
    position: relative;
  }
`;

export default () => {
  const [items, setItems] = useContext<any>(MovieContext);
  const [page, setPage] = useState(1);

  const loadMoreItems = async (startIndex: number, stopIndex: number) => {
    const { data } = await axios.get(`api/movie?page=${page}`);
    setPage((page) => page + 1);
    setItems([...items, ...data]);
    for (let index = startIndex; index < startIndex + data.length; index++) {
      itemStatusMap[index] = LOADED;
    }
  };
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = items.length + COLUMN_COUNT;

  // Every row is loaded except for loading indicator row.
  const isItemLoaded = (index: number) => index < items.length;

  // Render an item or a loading indicator.
  const Item = ({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: CSSProperties }) => {
    let label;
    const itemIndex = rowIndex * COLUMN_COUNT + columnIndex;
    const item = items[itemIndex];
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
              css={grid}
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
