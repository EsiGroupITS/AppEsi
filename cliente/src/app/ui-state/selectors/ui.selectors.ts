import * as uiState       from '../ui.state'
import { UiState, uiFeatureKey } from '../ui.state'
import { AppState }       from 'src/app/app.state'
import { createFeatureSelector, createSelector } from '@ngrx/store'




export const selectUiFeature = createFeatureSelector<UiState>(uiFeatureKey)

export const selectContrast = createSelector(
  selectUiFeature,
  (state: uiState.UiState) => state.contrast_black
)

export const selectTextSize = createSelector(
  selectUiFeature,
  (state: uiState.UiState) => state.text_size
)

export const selectTextSpacing = createSelector(
  selectUiFeature,
  (state: uiState.UiState) => state.text_spacing
)

export const selectVisibility = createSelector(
  selectUiFeature,
  (state: uiState.UiState) => state.high_visibility
)

export const selectFontType = createSelector(
  selectUiFeature,
  (state: uiState.UiState) => state.fontDyslexic
)

export const selectLuminosity = createSelector(
  selectUiFeature,
  (state: uiState.UiState) => state.luminouse
);