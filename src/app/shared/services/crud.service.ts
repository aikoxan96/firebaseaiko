import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private fireStore:AngularFirestore) { }

  newPost(data: Post){
    return this.fireStore.collection('posts').add(data)
  
  }
  readAllPost(){
    return this.fireStore.collection('posts').get()
  }
  getPost(id:string){
    return this.fireStore.collection('posts').doc(id).get()
  }
  updatePost(id:string,data:Post){
    return this.fireStore.collection('posts').doc(id).update(data)
  }
  deletePost(id:string){
    return this.fireStore.collection('posts').doc(id).delete()
  }
  
}




