import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Character, PAGE_SIZE } from '@app/shared/models';
import { CharactersSelectors } from '@app/shared/data-access-characters';
import { LocationsActions } from '@app/shared/data-access-locations';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersListComponent implements OnInit {
  characters$: Observable<Character[]> = this.store.select(CharactersSelectors.getCharacters);
  loading$: Observable<boolean> = this.store.select(CharactersSelectors.getLoading);
  totalCharacters$: Observable<number> = this.store.select(CharactersSelectors.getTotalCharacters);
  pageIndex$: Observable<number> = this.store.select(CharactersSelectors.getCurrentPage).pipe(map((page) => page - 1));
  pageSize = PAGE_SIZE;

  constructor(private readonly store: Store, private router: Router) {}

  ngOnInit(): void {}

  changePage(page: PageEvent): void {
    this.router.navigate([], {
      queryParams: { page: page.pageIndex + 1 },
      queryParamsHandling: 'merge',
    });
  }

  prefetchLocation(locationId: number): void {
    if (locationId) {
      this.store.dispatch(LocationsActions.hoverLocationOfCharacter({ locationId }));
    }
  }
}
