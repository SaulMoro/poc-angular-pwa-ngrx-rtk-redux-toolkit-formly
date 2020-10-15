import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersFilterFormComponent } from './characters-filter-form.component';

describe('CharactersFilterFormComponent', () => {
  let component: CharactersFilterFormComponent;
  let fixture: ComponentFixture<CharactersFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersFilterFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
