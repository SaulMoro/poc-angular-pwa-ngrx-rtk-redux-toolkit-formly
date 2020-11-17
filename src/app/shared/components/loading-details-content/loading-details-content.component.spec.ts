import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDetailsContentComponent } from './loading-details-content.component';

describe('LoadingDetailsContentComponent', () => {
  let component: LoadingDetailsContentComponent;
  let fixture: ComponentFixture<LoadingDetailsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingDetailsContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
