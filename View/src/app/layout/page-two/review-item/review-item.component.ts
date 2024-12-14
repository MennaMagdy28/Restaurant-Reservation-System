import { Component, Input } from '@angular/core';

interface Review {
  reviewerImage: string;
  reviewerName: string;
  reviewDate: string;
  reviewTitle: string;
    reviewBody:string;
}

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  // standalone: false,
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent {
    @Input() review!: Review;
}