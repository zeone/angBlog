import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts!: Post[];
  pSub!: Subscription;
  searchStr!:string
  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.pSub = this.postService.getPosts().subscribe((resp: Post[]) => {
      this.posts = resp;
    });
  }

  remove(post: Post) {
    if (!post.id) return;
    this.postService.delete(post.id);
    this.getPosts();
  }

  ngOnDestroy(): void {
    if (this.pSub) this.pSub.unsubscribe();
  }
}
