import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HashMap, TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CharactersActions, CharactersSelectors } from '@app/shared/data-access-characters';
import { LocationsActions } from '@app/shared/data-access-locations';
import { SelectOption } from '@app/shared/ui-forms';
import { Character, CharactersFilter, CharacterGender, CharacterSpecies, CharacterStatus } from '@app/shared/models';
import { charactersFilterForm } from '../../forms/characters-filter.form';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersListComponent implements OnInit {
  characters$: Observable<Character[]> = this.store.select<Character[]>(CharactersSelectors.getCharacters);
  loading$: Observable<boolean> = this.store.select(CharactersSelectors.getLoading);
  page$: Observable<number> = this.store.select(CharactersSelectors.getCurrentPage);
  pages$: Observable<number> = this.store.select(CharactersSelectors.getTotalPages);

  form = charactersFilterForm(this._status$, this._genders$, this._species$);

  constructor(private readonly store: Store, private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.store.dispatch(CharactersActions.enterCharactersPage());
  }

  newFilter(filter: CharactersFilter) {
    this.store.dispatch(CharactersActions.newCharactersFilter(filter));
  }

  filterPageChange(page: number) {
    this.store.dispatch(CharactersActions.filterPageChange(page));
  }

  resetFilter() {
    this.store.dispatch(CharactersActions.resetFilter());
  }

  prefetchLocation(locationId: number): void {
    if (locationId) {
      this.store.dispatch(LocationsActions.hoverLocationOfCharacter(locationId));
    }
  }

  trackByFn(index: number, character: Character): number {
    return character?.id ?? index;
  }

  private get _status$(): Observable<SelectOption[]> {
    return this.translocoService.selectTranslateObject('CHARACTERS.STATUS').pipe(
      map((translated: HashMap<string>) => [
        {
          value: CharacterStatus.alive,
          label: translated[CharacterStatus.alive.toUpperCase()],
        },
        {
          value: CharacterStatus.dead,
          label: translated[CharacterStatus.dead.toUpperCase()],
        },
        {
          value: CharacterStatus.unknown,
          label: translated[CharacterStatus.unknown.toUpperCase()],
        },
      ]),
    );
  }

  private get _genders$(): Observable<SelectOption[]> {
    return this.translocoService.selectTranslateObject('CHARACTERS.GENDER').pipe(
      map((translated: HashMap<string>) => [
        {
          value: CharacterGender.male,
          label: translated[CharacterGender.male.toUpperCase()],
        },
        {
          value: CharacterGender.female,
          label: translated[CharacterGender.female.toUpperCase()],
        },
        {
          value: CharacterGender.genderless,
          label: translated[CharacterGender.genderless.toUpperCase()],
        },
        {
          value: CharacterGender.unknown,
          label: translated[CharacterGender.unknown.toUpperCase()],
        },
      ]),
    );
  }

  private get _species$(): Observable<SelectOption[]> {
    return this.translocoService.selectTranslateObject('CHARACTERS.SPECIES').pipe(
      map((translated: HashMap<string>) => [
        {
          value: CharacterSpecies.alien,
          label: translated[CharacterSpecies.alien.toUpperCase()],
        },
        {
          value: CharacterSpecies.animal,
          label: translated[CharacterSpecies.animal.toUpperCase()],
        },
        {
          value: CharacterSpecies.human,
          label: translated[CharacterSpecies.human.toUpperCase()],
        },
        {
          value: CharacterSpecies.humanoid,
          label: translated[CharacterSpecies.humanoid.toUpperCase()],
        },
        {
          value: CharacterSpecies.mytholog,
          label: translated[CharacterSpecies.mytholog.toUpperCase()],
        },
        {
          value: CharacterSpecies.poopybutthole,
          label: translated[CharacterSpecies.poopybutthole.toUpperCase()],
        },
        {
          value: CharacterSpecies.robot,
          label: translated[CharacterSpecies.robot.toUpperCase()],
        },
        {
          value: CharacterSpecies.vampire,
          label: translated[CharacterSpecies.vampire.toUpperCase()],
        },
        {
          value: CharacterSpecies.cronenberg,
          label: translated[CharacterSpecies.cronenberg.toUpperCase()],
        },
        {
          value: CharacterSpecies.disease,
          label: translated[CharacterSpecies.disease.toUpperCase()],
        },
        {
          value: CharacterSpecies.unknown,
          label: translated[CharacterSpecies.unknown.toUpperCase()],
        },
      ]),
    );
  }
}
