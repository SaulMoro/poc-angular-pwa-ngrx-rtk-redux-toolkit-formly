import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

export interface MenuItem {
  name: string;
  path: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() language: string;
  @Input() languages: string[];
  @Output() languageChange = new EventEmitter<string>();

  appMenu: MenuItem[] = [
    {
      name: 'CHARACTERS.TITLE',
      path: '/characters',
    },
    {
      name: 'LOCATIONS.TITLE',
      path: '/locations',
    },
    {
      name: 'EPISODES.TITLE',
      path: '/episodes',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  trackByFn(index: number): number {
    return index;
  }

  onLanguageSelect({ value: language }): void {
    this.languageChange.emit(language);
  }
}
