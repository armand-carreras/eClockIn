import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from '../../shared/interfaces/task';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../shared/services/auth.service';
import { FireService } from '../../shared/services/fire.service';


@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss']
})
export class ListManagerComponent implements OnInit {

  tasksArray: string[];
  user:User;
  chronoTime:number;
  startVisible: boolean;
  endVisible: boolean;
  totalTaskTime:string;
  elapsedTimeString:string;
  toggle:boolean;

  constructor(private afs: FireService,
              private routes: ActivatedRoute,
              private authService: AuthService) { 
    this.user={};
    this.chronoTime = 0;
    this.afs.getTasks$().subscribe(e =>{ console.log(e['taskArray']); this.tasksArray = e['taskArray']})

}



  ngOnInit(): void {
    // this.authService.user.subscribe(data => {
    //   this.afs.getLoginUser$(data.uid).subscribe(data =>{
    //     this.user = data[0];
    //     console.log(this.user);
    //   })
    // });
    this.toggle=false;
    this.authService.user.subscribe(data => {
      this.afs.getLoginUser$(data.uid).subscribe(data =>{
        this.user = data[0];
        console.log(this.user);
      })
    })
    
    // console.log(this.singleTask.endDate, this.singleTask.initDate);
    // this.elapsedTimeString = this.elapsedTime(this.singleTask.initDate, this.singleTask.endDate);
    // console.log(this.elapsedTimeString);
  }
  ngAfterContentChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    
    if(this.user.currentTask !== undefined){
      console.log('hay task');
      this.endVisible=true;
      this.startVisible=false;
    }
    else{
      console.log('no hay task');
      this.startVisible=true;
        this.endVisible = false;}
  }
  initFace(){
  }

  logOut(){
    this.authService.logout();
  }


  startingTaskHandle(task:Task){
    this.user.currentTask = task;
    this.startVisible = !this.startVisible;
    this.endVisible = !this.endVisible;
    if(task.elapsed){
      this.chronoTime = task.elapsed;
    }
    else{this.chronoTime = 0}
    console.log('TaskStart');
    this.afs.userUpdateTask(this.user);
  }

  completedTaskHandle(user: User){
    this.user = user;
    this.afs.createCompleted(user);
  }

  toggleT(){
    if(this.toggle){this.toggle = !this.toggle}
    else{this.toggle = !this.toggle}
  }


  totalTasks = function():number{
    if(this.user.completedTaskList?.length){
      return this.user.completedTaskList?.length;
    }
    else{return 0;}
  }


  totalElapsedTime():number{
    if(this.user.completedTaskList){
      let sum=0;
      let list = this.user.completedTaskList;
      list.forEach(e => {
        sum += e.elapsed;
      })
      return sum;
    }
    else{
      return 0;
    }
  }


  elapsedTime = function(initDate, endDate):string{

    let resta = endDate.valueOf() - initDate.valueOf();

    let miliseconds = Math.floor(resta%1000);
    resta = resta/1000;
    let seconds = Math.floor(resta%60);
    resta = resta/60;
    let minutes = Math.floor(resta % 60);
    resta = resta/60;
    let hours = Math.floor(resta%24);
    resta = resta/24;
    let day = Math.floor(resta%30);
    resta = resta/30;
    let month = Math.floor(resta%12);
    resta = resta / 12;
    let year = Math.floor(resta)

    let arrayD=[year,month,day,hours,minutes,seconds,miliseconds];
    let arrayS=['Years','Months','Days', 'Hours', 'Minutes', 'Seconds', 'miliseconds'];
    let resultAmount='';

    for(let i = 0; i<arrayD.length; i++){
      if (arrayD[i] != 0 && (arrayS[i]=='Years'||arrayS[i]=='Months')){
        resultAmount+=arrayD[i]+arrayS[i]+'/';
      }
      else if (arrayD[i] != 0 && arrayS[i]=='Days'){
        resultAmount+=arrayD[i]+arrayS[i]+'  ';
      }
      else if(arrayD[i] !=0 && !(arrayS[i]=='Years'||arrayS[i]=='Months'||arrayS[i]=='Days')){
        resultAmount+=arrayD[i]+arrayS[i]+':';
      }
      // else{resultAmount += ' . '}
    }
    return resultAmount;
  }


}
