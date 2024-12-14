import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsSectionComponent } from './reviews-section.component';

describe('ReviewsSectionComponent', () => {
  let component: ReviewsSectionComponent;
  let fixture: ComponentFixture<ReviewsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
