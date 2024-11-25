import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResponse } from '../../models/post-response.interface';

@Injectable({
  providedIn: 'root',
})
/**
 * @description CRUD actions for Post.
 */
export class PostService {
  private endpoint = '/posts';
  constructor(private http: HttpClient) {}

  /**
   * Fetch all posts
   * @returns Observable of Post array
   */
  findAllPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(this.endpoint);
  }

  /**
   * Fetch a specific post by ID
   * @param id Post ID
   * @returns Observable of Post
   */
  findPostById(id: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.endpoint}/${id}`);
  }

  /**
   * Create a new post in the api
   * @param post 
   * @returns Updated Post
   */
  createPost(post: any): Observable<any> {
    return this.http.post(this.endpoint, post);
  }

  /**
   * Update a post, using its id
   * @param id 
   * @param post 
   * @returns 
   */
  updatePost(id: number, post: any): Observable<any> {
    return this.http.put(`${this.endpoint}/${id}`, post);
  }
}
