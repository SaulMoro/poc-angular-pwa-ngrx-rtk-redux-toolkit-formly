import { PayloadAction } from '@reduxjs/toolkit';

export const plain = () => () => {};
export const withPayload = <P>() => (state: unknown, action: PayloadAction<P>) => {};
