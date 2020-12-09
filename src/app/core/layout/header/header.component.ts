import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
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

  menuPanelOpened = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  toggleMenuPanel(): void {
    this.menuPanelOpened = !this.menuPanelOpened;
  }

  onLanguageSelected(lang: string): void {
    this.cdRef.detectChanges();
  }

  trackByFn(index: number): number {
    return index;
  }
}
