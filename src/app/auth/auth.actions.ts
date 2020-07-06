import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const SET_USER_ACTION = createAction(
    'SET_USER_ACTION',
    props<{ user: User }>() 
);

export const UNSET_USER_ACTION = createAction(
    'UNSET_USER_ACTION'
); 