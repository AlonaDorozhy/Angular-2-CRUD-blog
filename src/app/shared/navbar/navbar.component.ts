import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth.service'
import { Post } from 'src/app/posts/post';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/posts/post.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  posts: Observable<Post[]>
  constructor(private postService: PostService, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.posts = this.postService.getPosts()
     
    console.log(this.posts)
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
