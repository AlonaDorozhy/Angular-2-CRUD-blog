import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { PostService } from '../post.service'
import { Post } from '../post'
import { AuthService } from '../../core/auth.service'
import { from } from 'rxjs';
import { Router } from '@angular/router';
import * as _ from 'lodash'; 
  import { Pipe, PipeTransform } from '@angular/core';
import { PostsModule } from '../posts.module';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

  @Pipe({
    name: 'unique',
    pure: false
  })

export class PostListComponent implements OnInit  {
  posts: Observable<Post[]>
 
  constructor(private postService: PostService, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.posts = this.postService.getPosts()
    
  
  }

  trackElement() {
  
    return 
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
