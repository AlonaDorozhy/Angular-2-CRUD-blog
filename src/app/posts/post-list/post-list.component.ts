import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { PostService } from '../post.service'
import { Post } from '../post'
import { AuthService } from '../../core/auth.service'
import { from } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>
  constructor(private postService: PostService, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.posts = this.postService.getPosts()
  }

  delete(id: string) {
    this.postService.delete(id)
      .then(
        () => {
          this.router.navigate(['/blog']);
        },
        err => {
          console.log(err);
        }
      )
  }


}
