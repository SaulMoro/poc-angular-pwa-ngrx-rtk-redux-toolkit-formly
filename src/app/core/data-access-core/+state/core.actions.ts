import { createAction, props } from '@ngrx/store';
import { SeoConfig } from '@app/core/seo';

export const changeLanguage = createAction('[App Page] Change Language', props<{ lang: string }>());

export const newSeoConfig = createAction('[SEO Service] New Seo Config', props<{ config: SeoConfig }>());
