import { createAction, props } from "@ngrx/store";

export const setToken = createAction(
  '[USERSTATE] Set Token',
  props<{token: string}>()
)

export const setName = createAction(
  '[USERSTATE] Set Name',
  props<{name: string, last_name: string}>()
)

export const setConfigId = createAction(
  '[USERSTATE] Set Config ID',
  props<{id: string}>()
)
