import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCharacterComponent } from './loading-character.component';

describe('LoadingCharacterComponent', () => {
  let component: LoadingCharacterComponent;
  let fixture: ComponentFixture<LoadingCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingCharacterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
