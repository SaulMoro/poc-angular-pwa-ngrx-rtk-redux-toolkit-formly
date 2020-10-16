import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesFilterFormComponent } from './episodes-filter-form.component';

describe('EpisodesFilterFormComponent', () => {
  let component: EpisodesFilterFormComponent;
  let fixture: ComponentFixture<EpisodesFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpisodesFilterFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodesFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
