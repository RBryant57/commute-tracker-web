import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayReasonEditComponent } from './delay-reason-edit.component';

describe('DelayReasonEditComponent', () => {
  let component: DelayReasonEditComponent;
  let fixture: ComponentFixture<DelayReasonEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelayReasonEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelayReasonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
