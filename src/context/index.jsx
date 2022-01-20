import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';

import { getSeasons } from '../utils/firestore';

const SeasonsContext = createContext();

export const ACTIONS = {
  SET_SEASONS_LIST: 'SET_SEASONS',
};

export const initialState = { seasons: {} };

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_SEASONS:
      return { seasons: payload };
    default: {
      return state;
    }
  }
};

export const useSeasonsContext = () => useContext(SeasonsContext);

export function SeasonsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchSeasons = useCallback(async () => {
    try {
      const seasons = await getSeasons(true);
      dispatch({ type: ACTIONS.SET_SEASONS, payload: seasons });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const value = useMemo(
    () => ({ ...state, fetchSeasons }),
    [fetchSeasons, state]
  );

  return (
    <SeasonsContext.Provider value={value}>{children}</SeasonsContext.Provider>
  );
}

SeasonsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};
