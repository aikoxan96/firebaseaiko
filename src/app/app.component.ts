import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from './models/post.model';
import { CrudService } from './shared/services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: Observable<any[]>;
  misPosts: Array<Post>=[];

  constructor(private fire:AngularFirestore, private crudPosts:CrudService){
    this.items = fire.collection('users').valueChanges();

    this.readAllPosts();

    this.getPost();
  }

  deletePost(){
    this.crudPosts.deletePost("MV88trp0T51dUEmjcPKE").then(success=>{
      console.log("Se ha eliminado correctamente, bro")
    }).catch(error=>{
      console.error("Problema eliminandose")
    })
  }

  updatePost(){
    const publication: Post={
      autor:"i03ZmM90hnqXX7inbFtN",
      content:"lorem ipsum",
      titulo:"La mejor noticia del mundo",
      date: new Date(),
    }
    this.crudPosts.updatePost("jgicihPmGBQ6HAMIGI1",publication).then(success=>{
      console.log("Todo ok")
    }).catch(error=>{
      console.log("Todo mal, error")
    })
  }

  getPost(){
    this.crudPosts.getPost("0QG2fhEju9SM2WA4sbeF").subscribe ( data =>{
      console.log("La publicación que quieres ver es",data.id,"y...",data.data())
    })
  }

  readAllPosts(){
    this.crudPosts.readAllPost().subscribe(data=>{
      data.forEach ( (doc:any) => {

        let myPost:Post=doc.data()
        myPost.id=doc.id

        this.misPosts.push(myPost)
      })
    })
  }


  createPost() {
    console.log("DALE")

    const publication: Post={
      autor:"i03ZmM90hnqXX7inbFtN",
      content:"lorem ipsum",
      titulo:"La mejor noticia del mundo",
      date: new Date(),
    }

    this.crudPosts.newPost(publication).then(success=> {
      console.log("To' ok!")
    }).catch(error=>{
      console.error("Algo ha ido mal")
    })
  }
}


