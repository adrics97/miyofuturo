import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn = false;

  constructor(private http:HttpClient, public  firebaseAuth: AngularFireAuth) {
   }


  async onSignIn(email:string, password:string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then ( res => {
      this.isLoggedIn = true;
      console.log(this.isLoggedIn)
      localStorage.setItem('email', JSON.stringify(res.user.email))
    })
  }


  async onSignUp(email:string, password:string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  changePassword(password: string){
    /*let user = firebase.auth().currentUser()
    //user.updatePassword(password).then(function() {
      console.log("Contraseña modificada correctemete")
    }).catch(function(error) {
      console.log(error)
    });*/
  }

   logOut(){
     this.firebaseAuth.signOut()
     localStorage.removeItem('email')
   }

   isAuthenticated(): boolean{
     let user = JSON.parse(localStorage.getItem('email'));
     if (user == null)
       return false;
     else
        return true;
   }


}
