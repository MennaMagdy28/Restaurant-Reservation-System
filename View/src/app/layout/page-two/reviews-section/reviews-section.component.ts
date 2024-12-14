import { Component } from '@angular/core';
import { ReviewItemComponent } from '../review-item/review-item.component';

interface Review {
  reviewerImage: string;
  reviewerName: string;
  reviewDate: string;
  reviewTitle: string;
    reviewBody:string;
}

@Component({
  selector: 'app-reviews-section',
  imports:[ReviewItemComponent],
  templateUrl: './reviews-section.component.html',
  // standalone: false,
  styleUrls: ['./reviews-section.component.css']
})
export class ReviewsSectionComponent {
    reviews: Review[] = [
        {
             reviewerImage: 'assets/avatar.png',
            reviewerName: 'Reviewer name',
            reviewDate: 'Date',
             reviewTitle: 'Review title',
             reviewBody: 'Review body'
        },
         {
              reviewerImage: 'assets/avatar.png',
            reviewerName: 'Reviewer name',
            reviewDate: 'Date',
             reviewTitle: 'Review title',
             reviewBody: 'Review body'
        },
         {
            reviewerImage: 'assets/avatar.png',
            reviewerName: 'Reviewer name',
            reviewDate: 'Date',
             reviewTitle: 'Review title',
             reviewBody: 'Review body'
        },
    ]
}