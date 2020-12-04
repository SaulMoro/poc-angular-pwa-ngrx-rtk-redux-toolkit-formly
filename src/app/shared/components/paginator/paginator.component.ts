import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {
  @Input() currentPage = 1;
  @Input() pages = 1;

  paginatorPanelOpened = false;
  paginator: 'prev' | 'post';

  constructor() {}

  ngOnInit(): void {}

  togglePaginatorPanel(paginator: 'prev' | 'post'): void {
    this.paginator = paginator;
    this.paginatorPanelOpened = !this.paginatorPanelOpened;
  }

  onPageSelect(): void {
    this.paginatorPanelOpened = false;
  }

  trackByFn(index: number): number {
    return index;
  }
}
