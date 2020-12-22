import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../../shared/interfaces/task';
import { User } from '../../../shared/interfaces/user';
import { FireService } from '../../../shared/services/fire.service';


@Component({
  selector: 'app-end-task',
  templateUrl: './end-task.component.html',
  styleUrls: ['./end-task.component.scss']
})

export class EndTaskComponent implements OnInit {

  timer;s
  taskList:string[];
  taskPaused: boolean;
  elapsedTaskTime: number;
  formatedTime: string;
  userExists: boolean;
  @Input() user:User;
  @Input() chrono:number;
  @Output() emitCompleted = new EventEmitter<User>();
  constructor(private afs: FireService) {
    this.userExists = false;
  }

  ngOnInit(): void {
    // const Timer = require('timer-machine')
    // this.myTimer = new Timer();
    // this.initTimer();
    // this.chronoInterval = setInterval(formatedTime,1000);
    if(this.user.currentTask.elapsed>=0){
      this.elapsedTaskTime = this.user.currentTask.elapsed;
      console.log('TaskElapsedTime', this.elapsedTaskTime);
      this.formatedTime = this.elapsedTime(this.elapsedTaskTime);
      // this.timer = setInterval(this.intervalChange(this.elapsedTime(this.elapsedTaskTime)),1000);
      console.log(this.user,'user');
    }
  }

  elapsedTime = function(time:number):string{

    let miliseconds = Math.floor(time%1000);
    time = time/1000;
    let seconds = Math.floor(time%60);
    time = time/60;
    let minutes = Math.floor(time % 60);
    time = time/60;
    let hours = Math.floor(time%24);
    time = time/24;

    let arrayD=[hours,minutes,seconds];
    let arrayS=['h', 'm', 's'];
    let resultAmount='';

    for(let i = 0; i<arrayD.length; i++){

      if(arrayD[i] !=0 && i<arrayD.length-1){
        resultAmount+=arrayD[i]+arrayS[i]+' ';
      }
      else if(arrayD[i]!=0){
        resultAmount+=arrayD[i]+arrayS[i];
      }
      
    }

    console.log('elapsed',resultAmount);
    return resultAmount;
  }
  

  pauseResumeTask(){
    // this.chronoInterval.clearInterval();
    if(this.user.currentTask.active){ //PAUSE MODE si la tarea esta activa
      
      if(this.user.currentTask.lastPausedDate['seconds'] > 0){  //se ha parado la tarea
    
      let tempMillis = parseInt(this.user.currentTask.lastPausedDate['seconds'])*1000 
                      + parseInt(this.user.currentTask.lastPausedDate['nanoseconds'])/1000000; //laspaused exists porque se ha parado con anterioridad
      this.user.currentTask.active = false;   //se pone en estado pause
      let newDate = new Date;           //cogemos nueva fecha pausa
      // clearInterval();                 
      console.log('last new date',newDate.getTime());
      console.log('tempMillis', tempMillis);
      this.user.currentTask.elapsed += newDate.getTime() - tempMillis; //nueva fecha pausa - antigua =+ elapsed
      this.elapsedTaskTime = this.user.currentTask.elapsed;
      this.user.currentTask.lastPausedDate = newDate;                  //sustituimos fecha de pausa antigua por nueva
      this.afs.userUpdateTask(this.user);
      
      }
      else{ //nunca se ha parado la tarea
        this.user.currentTask.active = false;  //tarea pausada !activa
        
        let tempMillis = parseInt(this.user.currentTask.initDate['seconds'])*1000 
                        + parseInt(this.user.currentTask.initDate['nanoseconds'])/1000000;
        console.log('no last init Millis',tempMillis);
        let newDate = new Date;                 //fecha de pausa
        this.user.currentTask.elapsed = newDate.getTime() - tempMillis; //transcurrido desde el inicio
        this.elapsedTaskTime = this.user.currentTask.elapsed;
        this.user.currentTask.lastPausedDate = newDate;
        // clearInterval();
        this.afs.userUpdateTask(this.user);

      }
      this.formatedTime = this.elapsedTime(this.user.currentTask.elapsed);
    }
    else{  //RESUME MODE
      if(this.user.currentTask.lastPausedDate){ //asumimos que ya tiene que haber un lastPausedDate
        //set interval again
        console.log('resume');
        this.user.currentTask.active = true;
        this.user.currentTask.lastPausedDate = new Date;
        this.afs.userUpdateTask(this.user);
        
      }
    }

  }

  // intervalChange = function(chronoString: string){
  //   console.log('chrono string',chronoString)
  //   let arr = chronoString.split(':');
  //   console.log('array',arr);
  //   if(arr[2]=='60'){
  //     arr[2]='00';
  //     if(arr[1]=='60'){
  //       arr[1]='00';
  //       if(arr[0]=='24'){
  //         arr[0]='00';
  //       }
  //       else if(arr[0]!='24'){
  //         let temp = parseInt(arr[0])+1;
  //         arr[0] = temp.toString();
          
  //       }
  //     }
  //     else if(arr[1]!='60'){
  //       let temp = parseInt(arr[1])+1;
  //       arr[1] = temp.toString();
  //     }
  //   }
  //   else{
  //     let temp = parseInt(arr[2])+1;
  //     arr[2] = temp.toString();
  //   }
  //   console.log(arr)
  //   // return '0'
  //   return arr.join(':');
  // }
  update(element: Task){
    if(element.name === this.user.currentTask.name){
      element.elapsed += this.user.currentTask.elapsed;
      element.lastPausedDate = this.user.currentTask.lastPausedDate;
      element.endDate = this.user.currentTask.endDate;
      if(element.initDate){
        console.log('hay fecha');
      }
      else{
        element.initDate = this.user.currentTask.initDate;
      }
    }
    
  }
  stopTask(){
    this.user.currentTask.endDate = new Date;
    if(this.user.completedTaskList?.length>0){
      this.user.completedTaskList.push(this.user.currentTask)
    }
    else{
      this.user.completedTaskList = [];
      this.user.completedTaskList.push(this.user.currentTask);
    }
    let newUser={
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      completedTaskList: this.user.completedTaskList,
    }
    console.log(newUser);
    this.afs.createCompleted(newUser);
    this.emitCompleted.emit(newUser);
  }
}
