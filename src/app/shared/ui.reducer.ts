import { createReducer, on } from '@ngrx/store';
import { IS_LOADING_ACTION, STOP_LOADING_ACTION } from './ui.actions';

export interface State {
    isLoading: boolean; 
}

export const initialState: State = {
   isLoading: false 
}

const _userInterfaceReducer = createReducer(initialState,

    on(IS_LOADING_ACTION, state => ({ ...state, isLoading: true})),
    on(STOP_LOADING_ACTION, state => ({ ...state, isLoading: false})),

);

export function userInterfaceReducer(state, action) {
    return _userInterfaceReducer(state, action);
}