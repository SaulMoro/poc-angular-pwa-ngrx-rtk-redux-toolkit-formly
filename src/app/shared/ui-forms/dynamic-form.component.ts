import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dynamic-form',
  template: `
    <form *ngIf="!filter || (filterChanges$ | async)" novalidate [formGroup]="form" (ngSubmit)="submit($event)">
      <formly-form
        [form]="form"
        [fields]="fields"
        [model]="model"
        [options]="options"
        (modelChange)="modelChange($event)"
      ></formly-form>
      <ng-content></ng-content>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent {
  @Input() form: FormGroup = new FormGroup({});
  @Input() fields: FormlyFieldConfig[] = [];
  @Input() model: Record<string, unknown> = {};
  @Input() options: FormlyFormOptions = {};
  @Input() filter: 'onChange' | 'onSubmit' | null = null;
  @Output() modelChanges = new EventEmitter<Record<string, unknown>>();
  @Output() submitForm = new EventEmitter<Record<string, unknown>>();

  filterChanges$ = this.route.queryParams.pipe(
    map(({ page, ...filter }) => filter),
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
    tap((filter) => {
      this.model = { ...filter };
      this.modelChanges.emit(this.model);
    }),
  );

  constructor(private route: ActivatedRoute, private router: Router) {}

  modelChange(model: Record<string, unknown>): void {
    if (this.filter === 'onChange') {
      this._fillFilter(model);
    } else {
      this.modelChanges.emit({ ...model });
    }
  }

  submit(model: Record<string, unknown>): void {
    this.submitForm.emit({ ...model });
    if (this.filter === 'onSubmit') {
      this._fillFilter(model);
    }
  }

  private _fillFilter(model: Record<string, unknown>): void {
    this.router.navigate([], { queryParams: { ...model, page: null }, queryParamsHandling: 'merge' });
  }
}
