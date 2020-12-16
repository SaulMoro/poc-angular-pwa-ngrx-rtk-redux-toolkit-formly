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
  @Output() hoverLocation = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onHoverLocation(locationId: number): void {
    this.hoverLocation.next(locationId);
  }
}
