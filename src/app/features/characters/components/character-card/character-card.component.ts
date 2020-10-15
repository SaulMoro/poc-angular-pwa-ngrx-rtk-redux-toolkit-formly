import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '@app/shared/models';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent implements OnInit {
  @Input() character: Character;
  @Output() prefetchLocation = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  prefetchOnHoverLocation(locationId: number): void {
    this.prefetchLocation.next(locationId);
  }
}
