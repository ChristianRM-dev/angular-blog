import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PostResponse } from '../../models/post-response.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PostService } from '../../services/post/post.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-post',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, AsyncPipe],
  templateUrl: './read-post.component.html',
  styleUrl: './read-post.component.scss',
})
export class ReadPostComponent {
  post$: Observable<PostResponse>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id) {
          return this.postService.findPostById(id); // Call the service to get the post by ID
        }
        throw new Error('Post ID not found in URL');
      })
    );
  }

  goBack(): void {
    this.router.navigate(['']);
  }
}
