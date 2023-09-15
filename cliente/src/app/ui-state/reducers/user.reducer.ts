import * as userActions       from '../actions/user.actions'
import * as userState         from '../user.state'
import { createReducer, on }  from '@ngrx/store'

export const userFKey = 'userFkey'

export const userReducer = createReducer(
  userState.userInitialState,
  on(userActions.setToken,    (state, { token })          => ({...state, access_token: token})),
  on(userActions.setName,     (state, { name, last_name}) => ({...state, user_data: {name: name, last_name: last_name}})),
  on(userActions.setConfigId, (state, {id})               => ({
    ...state,
    user_data: {
      name: state.user_data.name,
      last_name: state.user_data.last_name,
      accesibility_config: {
        id: id
      }
    }
  }
  )),
)
