import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { throwIfAlreadyLoaded } from '@app/core/utils';
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
  constructor(@Optional() @SkipSelf() parentModule: DataAccessCharactersModule) {
    throwIfAlreadyLoaded(parentModule, DataAccessCharactersModule.name);
  }
}
