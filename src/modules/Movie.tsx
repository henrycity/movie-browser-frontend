import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

import axios from '../utils/axios';

export default () => {
  const hasNextPage = true;
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(1);

  const loadNextPage = async () => {
    setIsNextPageLoading(true);
    const { data } = await axios.get(`api/movie?page=${page}`);
    setPage(page + 1);
    setIsNextPageLoading(false);
    setItems([...items, ...data]);
  };

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => null : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  // Render an item or a loading indicator.
  const Item = ({ index, style }: any) => {
    let content;
    if (!isItemLoaded(index)) {
      content = 'Loading...';
    } else {
      content = items[index].title;
    }

    return <div style={style}>{content}</div>;
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader isItemLoaded={isItemLoaded} loadMoreItems={loadMoreItems} itemCount={itemCount}>
          {({ onItemsRendered, ref }) => (
            <List
              height={height}
              itemCount={itemCount}
              itemSize={35}
              width={width}
              ref={ref}
              onItemsRendered={onItemsRendered}
            >
              {Item}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};
