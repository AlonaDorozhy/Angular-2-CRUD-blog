import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-dashbord',
  templateUrl: './post-dashbord.component.html',
  styleUrls: ['./post-dashbord.component.css']
})
export class PostDashbordComponent implements OnInit {
  content: string
  image: string
  title: string

  saving = 'Create Post'

  uploadPercent: Observable<number>
  downloadURL: Observable<string>

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private storage: AngularFireStorage,
    private router: Router,
   

  ) { }
  
  ngOnInit() { }

  createPost() {
    const postData = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    }
    this.postService.create(postData)
    this.title = ''
    this.content = ''
    this.image = ''

    this.saving = 'Post Created!'
    setTimeout(() => (this.saving = 'Create Post'), 3000)

    this.router.navigate(['/blog']);

  }

  uploadImage(event) {

    let file = event.target.files[0];
    // let path = `img/${file.name}`;
    let path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('Add image');
    } else {

      let ref = this.storage.ref(path);
      let task = this.storage.upload(path, file);
      this.uploadPercent = task.percentageChanges();
      console.log('Success');
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => {
            console.log(url);
          });
        }
        )
      ).subscribe();
    }
  }
}
