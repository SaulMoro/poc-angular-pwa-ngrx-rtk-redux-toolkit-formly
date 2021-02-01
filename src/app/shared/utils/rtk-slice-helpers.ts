import { PayloadAction } from '@reduxjs/toolkit';
import { ErrorState, LoadingState } from '../models';

/* eslint-disable @typescript-eslint/no-empty-function */
export const plain = () => () => {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const plainWithPayload = <P>() => (state: unknown, action: PayloadAction<P>) => {};

export const loadingStart = (state: any) => {
  state.dataState = LoadingState.LOADING;
};
export const loadingFailed = (state: any, { payload: error }: PayloadAction<unknown>) => {
  state.dataState = { error } as ErrorState;
};
