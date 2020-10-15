import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Character } from '@app/shared/models';

@Component({
  selector: 'app-character-details-card',
  templateUrl: './character-details-card.component.html',
  styleUrls: ['./character-details-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailsCardComponent implements OnInit {
  @Input() character: Character;
  @Output() prefetchLocation = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  prefetchOnHoverLocation(locationId: number): void {
    this.prefetchLocation.next(locationId);
  }
}
