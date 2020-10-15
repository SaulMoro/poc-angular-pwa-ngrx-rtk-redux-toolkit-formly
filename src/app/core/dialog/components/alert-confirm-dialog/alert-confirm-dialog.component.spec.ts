import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertConfirmDialogComponent } from './alert-confirm-dialog.component';

describe('AlertConfirmDialogComponent', () => {
  let component: AlertConfirmDialogComponent;
  let fixture: ComponentFixture<AlertConfirmDialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AlertConfirmDialogComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
