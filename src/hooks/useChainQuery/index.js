import {useState} from "react";
import {LOADING_STATUSES} from "../../constants";

const ERRORS = [400, 401, 500, 501];

export const useChainQuery = queries => {
  const [loadings, setLoadings] = useState(queries.map(query => ({
    id: query.id,
    ...query.anotherData,
    status: LOADING_STATUSES.not_loading
  })));

  const handleChangeLoading = (propId, propStatus) => setLoadings(prev => {
    const foundLoadingIndex = prev.findIndex(({ id }) => id === propId);

    if (foundLoadingIndex > -1) {
      const updatedLoadings = [...prev];
      updatedLoadings[foundLoadingIndex] = {
        ...updatedLoadings[foundLoadingIndex],
        status: propStatus
      }

      return updatedLoadings;
    }

    return prev;
  })

  const callQuery = data => {
    const {
      id,
      queryUrl,
      params = null
    } = data;

    if (queryUrl ?? id) {
      handleChangeLoading(id, LOADING_STATUSES.loading);

      return fetch(queryUrl, params)
        .then(res => res.json())
        .then(res => {
          if (ERRORS.includes(res.error)) {
            handleChangeLoading(id, LOADING_STATUSES.error)
          } else {
            handleChangeLoading(id, LOADING_STATUSES.success)
            return res;
          }
        })
        .catch(err => console.log('err', err))
    } else {
      throw new Error('callQuery need get id and query params');
    }
  }

  const callQueries = () => {
    return queries.map(query => callQuery(query))
  };

  return {
    loadings,
    callQueries
  }
};