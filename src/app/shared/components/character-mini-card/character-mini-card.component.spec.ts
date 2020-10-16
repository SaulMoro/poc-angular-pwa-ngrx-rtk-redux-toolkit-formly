import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterMiniCardComponent } from './character-mini-card.component';

describe('CharacterMiniCardComponent', () => {
  let component: CharacterMiniCardComponent;
  let fixture: ComponentFixture<CharacterMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterMiniCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
