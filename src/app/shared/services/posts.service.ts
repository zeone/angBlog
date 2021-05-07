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
      id: '1',
    },
    {
      title: 'Test 3',
      author: 'Ihor',
      date: new Date(),
      text: 'Some text 4',
      id: '1',
    },
  ];
  constructor() {}

  getPosts(): Observable<Post[]> {
    return new Observable<Post[]>((obs) => {
      obs.next(this.posts);
    });
  }

  addPost(post: Post) {
    this.posts.push(post);
  }
}
