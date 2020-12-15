import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class TransferUserService {

  //Metodo transfer service para pasar datos de login a list manager
  
  private user = new BehaviorSubject<User>({
    name:'',
    email:'',
    currentTask:{},
    completedTaskList:[]    
  })
  sharedUser = this.user.asObservable();

  constructor() { }

  nextUser(user: User){
    this.user.next(user);
  }
}
