import { PayloadAction } from '@reduxjs/toolkit';

export const plain = () => () => {};
export const plainWithPayload = <P>() => (state: unknown, action: PayloadAction<P>) => {};
