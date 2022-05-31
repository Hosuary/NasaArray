
// Libraries
import React, { useState } from 'react';


const ERRORS = [400, 401, 500, 501];

const useQuery = (queryUrl, params = {}) => {
  const [loading, setLoading] = useState(false);

  const callQuery = () => {
    if (queryUrl) {
      setLoading(true);

      return fetch(queryUrl, params)
        .then(res => res.json())
        .then(res => {
          if (ERRORS.includes(res.error)) {
            throw new Error('Данные не были найдены')
          } else {
            return res;
          }
        })
        .catch(err => console.log('err', err))
        .finally(() => setLoading(false));
    } else {
      throw new Error('useQuery need get first parameter query url');
    }
  }

  return {
    callQuery,
    loading
  };
};

export default useQuery;