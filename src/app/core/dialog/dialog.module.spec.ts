import { TestBed, waitForAsync } from '@angular/core/testing';
import { DialogModule } from './dialog.module';

describe('DialogModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DialogModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(DialogModule).toBeDefined();
  });
});
