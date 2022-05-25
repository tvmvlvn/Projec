import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GenericActionPayload} from '../../utils/react';

export type ItemState = {
  value?: string;
};

export type ItemAction = GenericActionPayload & {
  value?: string;
};

export const initialState: ItemState = {
  value: 'https://google.com',
};

const slice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setValue: (s, {payload}: PayloadAction<ItemAction>) => {
      s.value = payload.value;
    },
    reset: s => {
      s.value = undefined;
    },
  },
});

export default slice.reducer;

const {setValue, reset} = slice.actions;

export const actions = {setValue, reset};
