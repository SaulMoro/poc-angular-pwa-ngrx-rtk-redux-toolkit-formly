import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCharacterMiniCardComponent } from './loading-character-mini-card.component';

describe('LoadingCharacterMiniCardComponent', () => {
  let component: LoadingCharacterMiniCardComponent;
  let fixture: ComponentFixture<LoadingCharacterMiniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingCharacterMiniCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingCharacterMiniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
