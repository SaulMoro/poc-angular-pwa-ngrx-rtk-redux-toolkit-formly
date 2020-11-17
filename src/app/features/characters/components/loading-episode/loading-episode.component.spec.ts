import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingEpisodeComponent } from './loading-episode.component';

describe('LoadingEpisodeComponent', () => {
  let component: LoadingEpisodeComponent;
  let fixture: ComponentFixture<LoadingEpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingEpisodeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
