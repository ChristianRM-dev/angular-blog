import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResponse } from '../../models/post-response.interface';
import { PostService } from '../../services/post/post.service';
import { AsyncPipe } from '@angular/common';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe,PostItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  posts$: Observable<PostResponse[]>;
  constructor(private postService: PostService) {
    this.posts$ = postService.findAllPosts();
  }
}
