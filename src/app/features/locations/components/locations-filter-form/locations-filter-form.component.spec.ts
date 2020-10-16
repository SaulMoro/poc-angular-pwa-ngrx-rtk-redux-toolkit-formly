import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsFilterFormComponent } from './locations-filter-form.component';

describe('LocationsFilterFormComponent', () => {
  let component: LocationsFilterFormComponent;
  let fixture: ComponentFixture<LocationsFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationsFilterFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
