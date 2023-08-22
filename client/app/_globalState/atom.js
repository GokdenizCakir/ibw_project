'use client';

import { atom } from 'recoil';

export const signerState = atom({
  key: 'signerState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});
