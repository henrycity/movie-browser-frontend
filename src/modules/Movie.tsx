import React, { useState, CSSProperties } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

import axios from '../utils/axios';
import { ItemStatusMap, Movie } from '../types';

let itemStatusMap: ItemStatusMap = {};

const LOADED = true;
const LOADING = false;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export default () => {
  const hasNextPage = true;
  const [items, setItems] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const loadNextPage = async (startIndex: number, stopIndex: number) => {
    for (let index = startIndex; index <= stopIndex; index++) {
      itemStatusMap[index] = LOADING;
    }
    const { data } = await axios.get(`api/movie?page=${page}`);
    setPage(page + 1);
    setItems([...items, ...data]);
    for (let index = startIndex; index < startIndex + data.length; index++) {
      itemStatusMap[index] = LOADED;
    }
  };

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  // Render an item or a loading indicator.
  const Item = ({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: CSSProperties }) => {
    let label;
    const itemIndex = rowIndex * 5 + columnIndex;
    if (itemStatusMap[itemIndex] === LOADED) {
      if (!items[itemIndex].backdrop_path) {
      }
      const picturePath = items[itemIndex].backdrop_path || items[itemIndex].poster_path || '';
      label = <img alt={items[itemIndex].title} src={`${IMAGE_URL}${picturePath}`} />;
    } else {
      label = 'Loading...';
    }
    return <div style={style}>{label}</div>;
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader isItemLoaded={isItemLoaded} loadMoreItems={loadNextPage} itemCount={itemCount}>
          {({ onItemsRendered, ref }) => (
            <Grid
              columnCount={5}
              columnWidth={400}
              height={height}
              rowCount={itemCount}
              rowHeight={400}
              onItemsRendered={(gridProps) => {
                onItemsRendered({
                  overscanStartIndex: gridProps.overscanRowStartIndex * 5,
                  overscanStopIndex: gridProps.overscanRowStopIndex * 5,
                  visibleStartIndex: gridProps.visibleRowStartIndex * 5,
                  visibleStopIndex: gridProps.visibleRowStopIndex * 5,
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
