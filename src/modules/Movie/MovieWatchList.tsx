import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';

import axios from '../../utils/axios';

const MovieWatchList = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios.get('api/list').then(({ data }) => {
      const lists: any = Object.entries(data).map(([key, value]) => ({
        name: key,
        numberOfMovies: (value as any).length,
      }));
      setLists(lists);
    });
  }, []);
  return (
    <div>
      {lists.map((list: any) => (
        <div
          css={css`
            display: flex;
          `}
          id={list.name}
        >
          <div>{list.name}</div>
          <div>{list.numberOfMovies}</div>
        </div>
      ))}
    </div>
  );
};

export default MovieWatchList;
