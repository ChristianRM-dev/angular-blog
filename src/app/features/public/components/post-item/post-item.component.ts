import { Component, input } from '@angular/core';
import { PostResponse } from '../../models/post-response.interface';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [MatCardModule,RouterModule],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  post = input.required<PostResponse>();
  constructor(private router: Router) {}

  viewPost(id: number) {
    this.router.navigate([`public/post/${id}`]);
  }
}
