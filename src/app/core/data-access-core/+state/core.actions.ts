import { createAction, props } from '@ngrx/store';

export const newNavigationData = createAction('[App Navigation] New Navigation Data', props<{ data: any }>());
