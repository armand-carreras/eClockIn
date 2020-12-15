import { identifierName } from '@angular/compiler';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, Input, OnInit } from '@angular/core';
import { GuardsCheckEnd } from '@angular/router';
import { LoginRoutingModule } from 'projects/auth/src/app/modules/login/login-routing.module';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';
import { User } from '../../../shared/interfaces/user';
import { FireService } from '../../../shared/services/fire.service';
import { LoggedInAuthService } from '../../../shared/services/logged-in-auth.service';

@Component({
  selector: 'app-end-task',
  templateUrl: './end-task.component.html',
  styleUrls: ['./end-task.component.scss']
})
export class EndTaskComponent implements OnInit {

  taskList:string[];
  taskPaused: boolean;
  elapsedTaskTime: number;
  formatedTime: string;
  userExists: boolean;
  @Input() user:User;
  @Input() chrono:number;
  constructor(private afs: FireService) {
    this.userExists = false;
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.user.currentTask.elapsed>=0){
      this.elapsedTaskTime = this.user.currentTask.elapsed;
      console.log('TaskElapsedTime', this.elapsedTaskTime);
      this.formatedTime=this.intervalChange(this.elapsedTime(this.elapsedTaskTime));
      console.log(this.user,'user');
    }
  }
  ngOnInit(): void {
    // const Timer = require('timer-machine')
    // this.myTimer = new Timer();
    // this.initTimer();
    // this.chronoInterval = setInterval(formatedTime,1000);
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

    let arrayD=[hours,minutes,seconds,miliseconds];
    let arrayS=['Hours', 'Minutes', 'Seconds', 'miliseconds'];
    let resultAmount='';

    for(let i = 0; i<arrayD.length; i++){

      if(arrayD[i] !=0 && !(arrayS[i]=='Years'||arrayS[i]=='Months'||arrayS[i]=='Days')){
        resultAmount+=arrayD[i]+':';
      }
      else{resultAmount = '00:00:00'}
    }

    console.log('elapsed',resultAmount);
    return resultAmount;
  }
  

  pauseResumeTask(){
    // this.chronoInterval.clearInterval();
    if(this.user.currentTask.active){ //PAUSE MODE si la tarea esta activa
      
      if(this.user.currentTask.lastPausedDate['seconds']>0){  //se ha parado la tarea
    
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

    }}
    else{  //RESUME MODE
      if(this.user.currentTask.lastPausedDate){ //asumimos que ya tiene que haber un lastPausedDate
        //set interval again
        console.log('resume');
        this.user.currentTask.active = true;
        this.user.currentTask.lastPausedDate = new Date;
        
      }
    }
  }

  intervalChange = function(chronoString: string){
    console.log(chronoString)
    let arr = chronoString.split(':');
    console.log(arr);
    if(arr[2]=='60'){
      arr[2]='00';
      if(arr[1]=='60'){
        arr[1]='00';
        if(arr[0]=='24'){
          arr[0]='00';
        }
        else if(arr[0]!='24'){
          let temp = parseInt(arr[0])+1;
          arr[0] = temp.toString();
          
        }
      }
      else if(arr[1]!='60'){
        let temp = parseInt(arr[1])+1;
        arr[1] = temp.toString();
      }
    }
    else{
      let temp = parseInt(arr[2])+1;
      arr[2] = temp.toString();
    }
    console.log(arr)
    // return '0'
    return arr.join(':');
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('destroy')
  }
}
