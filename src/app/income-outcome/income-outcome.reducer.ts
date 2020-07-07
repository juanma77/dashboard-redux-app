import { createReducer, on } from '@ngrx/store';
import { SET_ITEMS_ACTION } from './income-outcome.actions';
import { IncomeOutcome } from '../models/income-outcome.model';
import { UNSET_USER_ACTION } from '../auth/auth.actions';

export interface State {
    items: IncomeOutcome[]
}

export const initialState: State = {
   items: []
}

const _incomeOutcomeReducer = createReducer(initialState,

    on( SET_ITEMS_ACTION, (state, { items })  => ({ ...state, items: [...items] })),
    on( UNSET_USER_ACTION, state => ({ ...state, items: [] }) )

);

export function incomeOutcomeReducer(state, action) {
    return _incomeOutcomeReducer(state, action);
}