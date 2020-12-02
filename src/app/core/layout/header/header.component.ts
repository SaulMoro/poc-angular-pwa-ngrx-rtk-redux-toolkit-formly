import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { MenuItem } from '../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() menu: MenuItem[];
  @Input() language: string;
  @Input() languages: string[];
  @Output() languageChange = new EventEmitter<string>();

  menuPanelOpened = false;

  constructor() {}

  ngOnInit(): void {}

  toggleMenuPanel(): void {
    this.menuPanelOpened = !this.menuPanelOpened;
    console.log(this.menuPanelOpened);
  }

  onLanguageSelect(language: string): void {
    this.languageChange.emit(language);
  }

  trackByFn(index: number): number {
    return index;
  }
}
