import { TestBed, waitForAsync } from '@angular/core/testing';
import { DynamicFormsModule } from './dynamic-forms.module';

describe('DynamicFormsModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DynamicFormsModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(DynamicFormsModule).toBeDefined();
  });
});
