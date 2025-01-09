import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareClassEditComponent } from './fare-class-edit.component';

describe('FareClassEditComponent', () => {
  let component: FareClassEditComponent;
  let fixture: ComponentFixture<FareClassEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FareClassEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FareClassEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
