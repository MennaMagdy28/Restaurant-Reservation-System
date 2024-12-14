import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResurantPageComponent } from './resurant-page.component';

describe('ResurantPageComponent', () => {
  let component: ResurantPageComponent;
  let fixture: ComponentFixture<ResurantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResurantPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResurantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
