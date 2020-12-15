import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {
  @Input() currentPage: number;
  @Input() pages: number;
  @Output() page = new EventEmitter<number>();

  paginatorPanelOpened = false;
  paginator: 'prev' | 'post';

  constructor() {}

  ngOnInit(): void {}

  togglePaginatorPanel(paginator: 'prev' | 'post'): void {
    this.paginator = paginator;
    this.paginatorPanelOpened = !this.paginatorPanelOpened;
  }

  onPageSelect(page: number): void {
    this.paginatorPanelOpened = false;
    this.page.emit(page);
  }

  trackByFn(index: number): number {
    return index;
  }
}
