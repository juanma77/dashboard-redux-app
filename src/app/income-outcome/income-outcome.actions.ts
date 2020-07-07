import { createAction, props } from '@ngrx/store';
import { IncomeOutcome } from '../models/income-outcome.model';

export const SET_ITEMS_ACTION = createAction(
    'SET_ITEMS_ACTION',
    props<{ items: IncomeOutcome [] }>()
);

export const UNSET_ITEMS_ACTION = createAction(
    'UNSET_ITEMS_ACTION'
);