import { KeyValue } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, ContentChild, TemplateRef } from '@angular/core';

export interface TableConfig<T> {
  headers: {
    [dataKey: string]: string;
  };
  data: T[];
  linkData?: (data: T) => string;
  actionsHeader?: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() config!: TableConfig<any>;
  @ContentChild(TemplateRef) actions!: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {
    if (!this.config) {
      throw new TypeError('The input "config" is required');
    }
  }

  keepOriginalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>) => a.key;
  trackByFn = (index: number) => index;
}
