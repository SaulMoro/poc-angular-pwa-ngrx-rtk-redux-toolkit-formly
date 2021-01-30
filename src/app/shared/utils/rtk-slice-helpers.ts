/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction } from '@reduxjs/toolkit';

export const plain = () => () => {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const plainWithPayload = <P>() => (state: unknown, action: PayloadAction<P>) => {};
