import {combineReducers} from 'redux';

import itemReducer, {
  initialState as itemInitialState,
  ItemState,
} from './item/duck';

export const rootReducer = combineReducers({
  item: itemReducer,
});

export type RootState = {
  item: ItemState;
};

export const defaultInitialState = Object.freeze({
  item: itemInitialState,
});
