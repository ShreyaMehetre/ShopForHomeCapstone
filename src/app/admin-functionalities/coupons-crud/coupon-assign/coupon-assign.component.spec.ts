import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponAssignComponent } from './coupon-assign.component';

describe('CouponAssignComponent', () => {
  let component: CouponAssignComponent;
  let fixture: ComponentFixture<CouponAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponAssignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
