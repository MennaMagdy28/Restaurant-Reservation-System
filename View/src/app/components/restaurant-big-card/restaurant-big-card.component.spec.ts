import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantBigCardComponent } from './restaurant-big-card.component';

describe('RestaurantBigCardComponent', () => {
  let component: RestaurantBigCardComponent;
  let fixture: ComponentFixture<RestaurantBigCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantBigCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantBigCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
