import { createAction } from '@ngrx/store';

export const IS_LOADING_ACTION = createAction(
    'IS_LOADING_ACTION'
);

export const STOP_LOADING_ACTION = createAction(
    'STOP_LOADING_ACTION'
);