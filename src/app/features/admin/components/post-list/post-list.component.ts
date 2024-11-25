import { Component } from '@angular/core';
import { PostService } from '../../../public/services/post/post.service';
import {
  GenericTableComponent,
  TableAction,
  TableColumn,
} from '../../../../shared/components/generic-table/generic-table.component';
import { Observable } from 'rxjs';
import { PostResponse } from '../../../public/models/post-response.interface';
import { AsyncPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [GenericTableComponent, AsyncPipe, RouterModule, MatButtonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  posts$: Observable<PostResponse[]>;
  tableColumns: TableColumn[] = [
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'author',
      label: 'Author',
    },
  ];

  tableActions: TableAction[] = [
    { name: 'edit', label: 'Edit', icon: 'edit', color: 'primary' },
    { name: 'delete', label: 'Delete', icon: 'delete', color: 'warn' },
  ];

  constructor(private postService: PostService, private router: Router) {
    this.posts$ = postService.findAllPosts();
  }

  handleAction(event: { action: string; element: any }) {
    const { action, element } = event;

    if (action === 'edit') {
      console.log('Editing:', element, `posts/edit/${element.id}`);
      this.router.navigate([`/admin/post/edit/${element.id}`]);
    } else if (action === 'delete') {
      console.log('Deleting:', element);
    }
  }
}
