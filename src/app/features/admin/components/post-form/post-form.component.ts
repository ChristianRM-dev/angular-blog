import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../public/services/post/post.service';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent {
  postForm: FormGroup;
  isEditMode: boolean = false;
  postId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {
    // Initialize the form
    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      body: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      headerImageUrl: new FormControl('', [
        Validators.required,
        Validators.pattern(/https?:\/\/.+/),
      ]),
      date: new FormControl(new Date().toISOString().split('T')[0], [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    // Check if 'id' exists in the route (edit mode)
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.postId;

    if (this.isEditMode) {
      // Load existing data for editing
      this.postService
        .findPostById(this.postId.toString())
        .subscribe((post) => {
          this.postForm.patchValue(post);
        });
    }
  }

  onSubmit(): void {
    if (this.postForm.invalid) return;

    if (this.isEditMode) {
      // Update the post
      this.postService
        .updatePost(this.postId!, this.postForm.value)
        .subscribe(() => {
          alert('Post updated successfully!');
          this.router.navigate(['/posts']);
        });
    } else {
      // Create a new post
      this.postService.createPost(this.postForm.value).subscribe(() => {
        alert('Post created successfully!');
        this.router.navigate(['/posts']);
      });
    }
  }
}
