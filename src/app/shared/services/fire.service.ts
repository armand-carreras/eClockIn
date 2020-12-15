import { ɵangular_packages_animations_browser_browser_a } from '@angular/animations/browser';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private fireService: AngularFirestore) { }

  userUpdateTask(user:User){
    let currentTask = user.currentTask;
    this.fireService.collection<User>('Users').doc(user.id).update(user);
  }
  
  getLoginUser$(uid:string): Observable<User[]>{
    const loginRef = this.fireService.collection<User>('Users', ref=>ref.where('id', '==', uid));
    return loginRef.valueChanges();
  }
  getEmailUser$(email:string): Observable<User[]>{
    const loginRef = this.fireService.collection<User>('Users', ref=>ref.where('email', '==', email));
    return loginRef.valueChanges();
  }
  getTasks$(): Observable<string[]>{
    return this.fireService.collection<string[]>('Tasks').doc().valueChanges()
  }
  createUser(id: string, name: string,email: string,password: string){
    let user = {
      id: id,
      name: name,
      email: email,
      password: password
    }
    this.fireService.collection<User>('Users').doc(user.id).set(user);
  }

}
