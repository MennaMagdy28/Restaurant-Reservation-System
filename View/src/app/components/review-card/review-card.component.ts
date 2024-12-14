import { Component, Input } from '@angular/core';

interface Review {
  reviewerImage: string;
  reviewerName: string;
  reviewDate: string;
  reviewTitle: string;
    reviewBody:string;
}

@Component({
  selector: 'app-review-card',
  imports: [],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent {
  @Input() review!: Review;

}