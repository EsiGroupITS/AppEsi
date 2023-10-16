import * as userState from '../user.state'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export const selectUserFeature = createFeatureSelector<userState.UserState>(userState.userFeatureKey)

export const selectName =  createSelector(
  selectUserFeature,
  (state: userState.UserState) => state.user_data.name
)

export const selectLastName = createSelector(
  selectUserFeature,
  (state: userState.UserState) => state.user_data.last_name
)

export const selectToken = createSelector(
  selectUserFeature,
  (state: userState.UserState) => state.access_token
)

export const selectConfigId = createSelector(
  selectUserFeature,
  (state: userState.UserState) => state.user_data.accesibility_config?.id
)
