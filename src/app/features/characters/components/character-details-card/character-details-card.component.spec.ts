import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailsCardComponent } from './character-details-card.component';

describe('CharacterDetailsCardComponent', () => {
  let component: CharacterDetailsCardComponent;
  let fixture: ComponentFixture<CharacterDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterDetailsCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
