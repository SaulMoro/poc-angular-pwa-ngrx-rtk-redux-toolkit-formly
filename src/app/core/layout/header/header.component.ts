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

  constructor() {}

  ngOnInit(): void {}

  onLanguageSelect({ value: language }): void {
    this.languageChange.emit(language);
  }

  trackByFn(index: number): number {
    return index;
  }
}
