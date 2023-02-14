import {Member} from '../models';

export type Dispatch = {
  type: keyof Store;
  payload: any;
};

export type Store = {
  user: null | Member;
  uuid: string;
  getTalk: null | ((callback?: () => void) => void);
};
