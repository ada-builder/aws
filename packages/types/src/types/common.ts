import { HORIZONTAL, VERTICAL } from '../constants';

export type Vector2 = {
  x: number;
  y: number;
};

export type Orientation = typeof HORIZONTAL | typeof VERTICAL;
