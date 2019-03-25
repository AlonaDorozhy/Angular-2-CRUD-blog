import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-dashbord',
  templateUrl: './post-dashbord.component.html',
  styleUrls: ['./post-dashbord.component.css']
})
export class PostDashbordComponent implements OnInit {
  uploadPercent: Observable<number>
  downloadURL: Observable<string>
  
  title: string;
  content: string;
  image: string = null;
  saving = 'Create Post';


  constructor(
    private auth: AuthService,
    private postService: PostService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
  }
  createPost() {
    const postData = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image || null,
      published: new Date(),
      title: this.title
    }
    this.postService.create(postData)
    this.title = ''
    this.content = ''
    this.image = ''

    this.saving = 'Post Created!'
    setTimeout(() => (this.saving = 'Create Post'), 3000)
  }

  uploadImage(event) {
    let file = event.target.files[0];
    let path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files')
    } else {
      let task = this.storage.upload(path, file);
      let ref = this.storage.ref(path);
      this.downloadURL = ref.getDownloadURL();
      this.uploadPercent = task.percentageChanges()
      console.log('Image Uploaded!')
      this.downloadURL.subscribe(url => (this.image = url));
      
    }
  }
}
