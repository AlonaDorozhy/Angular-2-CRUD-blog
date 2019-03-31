import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { PostService } from '../post.service'
import { Post } from '../post'
import { AuthService } from '../../core/auth.service'
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  editing: boolean = false;
 
  content: string
  image: string
  title: string
  uploadPercent: Observable<number>
  downloadURL: Observable<string>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private auth: AuthService,
    private storage: AngularFireStorage,
   
  ) { }

  ngOnInit() {
    this.getPost()

  }
  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.getPostData(id).subscribe(post => (this.post = post))

  }

  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content,
      image: this.image,
    }

    const id = this.route.snapshot.paramMap.get('id');
    this.postService.update(id, formData);
    this.editing = false
  }

  uploadImage(event) {

    let file = event.target.files[0];
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
            this.image = url

          });
        }
        )
      ).subscribe();
    }
  }

  delete() {
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.delete(id)
    this.router.navigate(['/blog'])
  }


}
