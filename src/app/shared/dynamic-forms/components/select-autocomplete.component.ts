import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { FieldType } from '@ngx-formly/material';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-select-autocomplete-dynamic-form',
  template: `
    <mat-icon *ngIf="to.showSearchIcon" class="search-icon">search</mat-icon>
    <ng-container *transloco="let t">
      <mat-select
        [ngClass]="{ 'input-select': to.showSearchIcon }"
        [id]="id"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [placeholder]="to.placeholder"
        [tabindex]="to.tabindex || 0"
        (selectionChange)="change($event)"
        [errorStateMatcher]="errorStateMatcher"
        [disableOptionCentering]="to.disableOptionCentering"
        #singleSelect
      >
        <mat-option>
          <ngx-mat-select-search
            [placeholderLabel]="searchLabel"
            [noEntriesFoundLabel]="t(notFoundLabel)"
            [formControl]="dataFilterCtrl"
          ></ngx-mat-select-search>
        </mat-option>
        <mat-option *ngFor="let option of filteredData | ngrxPush" [value]="option.id">
          {{ t(option.label) }}
        </mat-option>
      </mat-select>
    </ng-container>
    <mat-icon *ngIf="showDeleteIcon && selectedValue() && !to.disabled" (click)="resetValue()" class="reset-icon"
      >close</mat-icon
    >
  `,
  styles: [
    `
      .input-select {
        position: absolute;
        left: 10px;
        padding-left: 20px;
      }

      .reset-icon,
      search-icon {
        background-color: #fff;
        font-size: 18px;
      }

      .reset-icon {
        position: absolute;
        cursor: pointer;
        right: -6px;
      }

      search-icon {
        position: absolute;
        left: 6px;
        cursor: none;
      }
    `,
  ],
})
export class SelectAutocompleteComponent extends FieldType implements OnInit, OnDestroy {
  searchOptions: any[] = [];
  searchLabel = '';
  notFoundLabel = 'FORMS.NOT_FOUND';
  showDeleteIcon = true;

  /** control for the MatSelect filter keyword */
  public dataFilterCtrl: FormControl = new FormControl();

  /** list of data filtered by search keyword */
  public filteredData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  // tslint:disable-next-line: variable-name
  protected _onDestroy = new Subject<void>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.searchOptions = this.to.searchOptions ? this.to.searchOptions : this.searchOptions;
    this.searchLabel = this.to.searchLabel ? this.to.searchLabel : this.searchLabel;
    this.notFoundLabel = this.to.notFoundLabel ? this.to.notFoundLabel : this.notFoundLabel;
    this.filteredData.next(this.searchOptions.slice());
    this.showDeleteIcon =
      this.to && this.to.showDeleteIcon !== undefined ? this.to.showDeleteIcon : this.showDeleteIcon;

    if (!!this.to.defaultValue && !this.formControl.value) {
      this.formControl.setValue(this.to.defaultValue);
    }

    // listen for search field value changes
    this.dataFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy), debounceTime(300)).subscribe(() => {
      this.filterData();
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected filterData(): void {
    if (!this.searchOptions) {
      return;
    }
    // get the search keyword
    let search = this.dataFilterCtrl.value;
    if (!search) {
      this.filteredData.next(this.searchOptions.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the data
    this.filteredData.next(this.searchOptions.filter((option) => option.label.toLowerCase().indexOf(search) > -1));
  }

  change($event: MatSelectChange): void {
    if (this.to.change) {
      this.to.change(this.field, $event);
    }
  }

  resetValue(): void {
    this.formControl.setValue(null);
  }

  selectedValue(): boolean {
    return !!this.formControl.value && this.searchOptions.some((option) => option.id === this.formControl.value);
  }
}
