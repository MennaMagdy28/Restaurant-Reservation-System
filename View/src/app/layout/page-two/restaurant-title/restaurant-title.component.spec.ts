import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantTitleComponent } from './restaurant-title.component';

describe('RestaurantTitleComponent', () => {
  let component: RestaurantTitleComponent;
  let fixture: ComponentFixture<RestaurantTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
