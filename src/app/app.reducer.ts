// Reducer global de la aplicación; es el que esta en el app.module.ts 

import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as incomeOutcome from './income-outcome/income-outcome.reducer';

// Al comentar las lineas de abajo decimos que no queremos el incomeOutcome reducer aqui 
export interface AppState {

    ui: ui.State
    user: auth.State
    //incomeOutcome: incomeOutcome.State
}

export const appReducer: ActionReducerMap <AppState> = {

    ui: ui.userInterfaceReducer,
    user: auth.authReducer
    // incomeOutcome: incomeOutcome.incomeOutcomeReducer

}