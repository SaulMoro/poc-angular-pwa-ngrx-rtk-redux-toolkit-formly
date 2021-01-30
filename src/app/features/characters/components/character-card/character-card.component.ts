import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Character, CharacterStatus } from '@app/shared/models';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent {
  @Input() character!: Character;
  @Output() hoverLocation = new EventEmitter<number>();

  statusTypes = CharacterStatus;

  onHoverLocation(locationId: number): void {
    this.hoverLocation.next(locationId);
  }
}
