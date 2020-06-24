import React, { CSSProperties } from 'react';
import { FixedSizeList as List } from 'react-window';

import { useGetListsQuery } from '../MovieItem/MovieItem.graphql.generated';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { css } from '@emotion/core';

const MovieWatchList = () => {
  const { loading, data } = useGetListsQuery();

  if (loading || !data) {
    return <LoadingIndicator />;
  }

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div style={style}>
      {data.lists[index].name} ({data.lists[index].movies.length})
    </div>
  );

  return (
    <List
      css={css`
        margin: 10% auto;
      `}
      height={500}
      itemCount={data.lists.length}
      itemSize={50}
      width={300}
    >
      {Row}
    </List>
  );
};

export default MovieWatchList;
