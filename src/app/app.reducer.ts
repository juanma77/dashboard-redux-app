// Reducer global de la aplicación; es el que esta en el app.module.ts 

import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';

export interface AppState {

    ui: ui.State

}

export const appReducer: ActionReducerMap <AppState> = {

    ui: ui.userInterfaceReducer

}