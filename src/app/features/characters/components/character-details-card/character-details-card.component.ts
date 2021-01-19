import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Character } from '@app/shared/models';

@Component({
  selector: 'app-character-details-card',
  templateUrl: './character-details-card.component.html',
  styleUrls: ['./character-details-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailsCardComponent {
  @Input() character!: Character;
  @Output() hoverLocation = new EventEmitter<number>();

  onHoverLocation(locationId: number): void {
    this.hoverLocation.next(locationId);
  }
}
