import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTypeEditComponent } from './route-type-edit.component';

describe('RouteTypeEditComponent', () => {
  let component: RouteTypeEditComponent;
  let fixture: ComponentFixture<RouteTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteTypeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
