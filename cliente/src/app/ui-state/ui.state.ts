export const uiFeatureKey = 'ui'

export interface UiState {
  contrast_black  : boolean | null,
  text_size       : boolean | null,
  text_spacing    : boolean | null,
  high_visibility : boolean | null,
  fontDyslexic    : boolean | null,
  luminouse       : boolean | null
}

export const initialState: UiState = {
  contrast_black  : false,
  text_size       : false,
  text_spacing    : false,
  high_visibility : false,
  fontDyslexic    : false,
  luminouse       : false
}
