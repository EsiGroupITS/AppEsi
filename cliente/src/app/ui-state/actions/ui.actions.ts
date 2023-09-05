import { createAction } from '@ngrx/store';

export const changeContrast = createAction(
  '[UISTATE] Change Contrast Black',
);

export const changeTextSize = createAction(
  '[UISTATE] Change Text Size',
);

export const changeTextSpacing = createAction(
  '[UISTATE] Change Text Spacing',
);

export const changeVisibility = createAction(
  '[UISTATE] Change To High Visibility',
);

export const changeFontType = createAction(
  '[UISTATE] Change Font Type',
);


