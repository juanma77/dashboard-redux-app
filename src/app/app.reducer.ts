// Reducer global de la aplicación; es el que esta en el app.module.ts 

import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';


export interface AppState {

    ui: ui.State
    user: auth.State
}

export const appReducer: ActionReducerMap <AppState> = {

    ui: ui.userInterfaceReducer,
    user: auth.authReducer

}