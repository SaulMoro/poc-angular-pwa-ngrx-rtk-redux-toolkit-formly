import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Character, CharacterStatus } from '@app/shared/models';

@Component({
  selector: 'app-character-mini-card',
  templateUrl: './character-mini-card.component.html',
  styleUrls: ['./character-mini-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterMiniCardComponent implements OnInit {
  @Input() character?: Character;

  statusTypes = CharacterStatus;

  constructor() {}

  ngOnInit(): void {}
}
