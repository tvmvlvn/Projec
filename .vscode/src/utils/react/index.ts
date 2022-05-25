import {useDispatch} from 'react-redux';
import {useMemo} from 'react';
import {bindActionCreators} from 'redux';
import type {Action} from '@reduxjs/toolkit';

export type GenericAction<T> = Action & {
  payload: T;
};

export type GenericActionPayload = Record<string, any>;

export function useActions<T>(actions: T): T {
  const dispatch = useDispatch();
  return useMemo<T>(
    () => bindActionCreators(actions as never, dispatch) as never,
    [dispatch, actions],
  );
}
