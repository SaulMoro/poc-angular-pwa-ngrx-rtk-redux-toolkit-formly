import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  @Input() currentPage = 0;
  @Input() pages = 0;
  @Output() page = new EventEmitter<number>();

  paginatorPanelOpened = false;
  paginator: 'prev' | 'post' = 'prev';

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
