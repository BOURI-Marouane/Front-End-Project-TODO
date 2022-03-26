import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit 
{
  taskss : Task[] = [];
  constructor(private taskService:TaskService) { }
  ngOnInit()
  {
    this.getTasks();
  }
  getTasks()
  {  
    this.taskService.findAll().subscribe( tasks=> { 
      this.taskss=tasks.__ENTITIES;
      console.log( this.taskss)})
   // this.taskService.findAll().subscribe(tasks => this.tasks = tasks)
  }
  deleteTask(id:number)
  {
    
    this.taskService.delete([id])
    .subscribe(()=> {this.taskss = this.taskss.filter(task=>task.ID != id)})
  }
}
