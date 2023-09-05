import * as uiActions         from '../actions/ui.actions'
import * as uiState           from '../ui.state'
import { createReducer, on }  from '@ngrx/store'

export const uiFeatureKey = 'uiFKey'

export const uiReducer = createReducer(
  uiState.initialState,
  on(uiActions.changeContrast   , state => ({...state, contrast_black  : !state.contrast_black  })),
  on(uiActions.changeTextSize   , state => ({...state, text_size       : !state.text_size       })),
  on(uiActions.changeTextSpacing, state => ({...state, text_spacing    : !state.text_spacing    })),
  on(uiActions.changeVisibility , state => ({...state, high_visibility : !state.high_visibility })),
  on(uiActions.changeFontType   , state => ({...state, fontDyslexic    : !state.fontDyslexic    })),
)






