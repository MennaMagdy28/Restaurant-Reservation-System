import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewItemComponent } from './review-item.component';

describe('ReviewItemComponent', () => {
  let component: ReviewItemComponent;
  let fixture: ComponentFixture<ReviewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
