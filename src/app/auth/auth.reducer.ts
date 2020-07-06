import { createReducer, on } from '@ngrx/store';
import { SET_USER_ACTION, UNSET_USER_ACTION } from './auth.actions';
import { User } from '../models/user.model';

export interface State {
    user: User; 
}

export const initialState: State = {
  user: null
}

// Los 3 puntos en el { state } son para regresar todos los elementos, propiedades o nodos del state, aqui nada mas tenemos 1, pero en el futuro podemos tener otro, como el token y por eso lo manejamos asi; en el caso del { user } es para desestructurar el objeto y obtener todas sus propiedades tambien 
const _authReducer = createReducer(initialState,

    on(SET_USER_ACTION, ( state, { user }  ) => ({ ...state,  user: { ...user } })),
    on( UNSET_USER_ACTION, ( state ) => ({ ...state, user: null }))

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}