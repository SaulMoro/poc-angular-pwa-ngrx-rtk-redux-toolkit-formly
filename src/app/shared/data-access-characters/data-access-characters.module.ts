import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromCharacters from './+state/characters.reducer';
import { CharactersEffects } from './+state/characters.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCharacters.CHARACTERS_FEATURE_KEY, fromCharacters.charactersReducer, {
      initialState: fromCharacters.initialState,
      metaReducers: fromCharacters.metaReducers,
    }),
    EffectsModule.forFeature([CharactersEffects]),
  ],
})
export class DataAccessCharactersModule {
  constructor() {}
}
