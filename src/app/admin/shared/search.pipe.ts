import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search: string = ''): Post[] {
    if (!search.trim()) return posts;

    return posts.filter((p) => {
      return (
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.author.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
}
