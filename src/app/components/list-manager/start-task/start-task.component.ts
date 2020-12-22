import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Task } from '../../../shared/interfaces/task';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-start-task',
  templateUrl: './start-task.component.html',
  styleUrls: ['./start-task.component.scss']
})
export class StartTaskComponent implements OnInit {
  
  @Input() user:User;
  @Input() tasksArray:string[];
  @Output() emitTask = new EventEmitter<Task>();
  taskControl = new FormControl('', Validators.required);
  newTask: Task;
  constructor() {

  }

  ngOnInit(): void {
    this.newTask={}
  }

  startTask(){
    
    console.log(this.taskControl.value);

    this.newTask.name = this.taskControl.value;
    this.newTask.initDate = new Date();
    this.newTask.lastPausedDate = new Date;
    this.newTask.elapsed = 0;
    this.newTask.active = true;
    
    console.log(this.newTask)
    this.emitTask.emit(this.newTask)
  }

}
