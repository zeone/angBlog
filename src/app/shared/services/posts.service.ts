import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [
    {
      title: 'Test 1',
      author: 'Ihor',
      date: new Date(),
      text: 'Some text',
      id: '1',
    },
    {
      title: 'Test 2',
      author: 'Ihor',
      date: new Date(),
      text: 'Some text 2',
      id: '2',
    },
    {
      title: 'Test 3',
      author: 'Ihor',
      date: new Date(),
      text: 'Some text 4',
      id: '3',
    },
  ];
  constructor() {}

  getPosts(): Observable<Post[]> {
    return new Observable<Post[]>((obs) => {
      obs.next(this.posts);
    });
  }

  getPostById(id: string): Observable<Post> {
    return new Observable<Post>((obs) => {
      obs.next(this.posts.find((e) => e.id === id));
    });
  }

  addPost(post: Post) {
    post.id = (this.posts.length + 1).toString();
    this.posts.push(post);
  }

  delete(id: string) {
    this.posts = this.posts.filter((p) => p.id !== id);
  }

  updatePost(post: Post) {
    let index = this.posts.findIndex((e) => e.id == post.id);
    this.posts[index] = post;
  }
}
