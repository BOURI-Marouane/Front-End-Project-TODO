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
  showForm = false;
  editFrom = false;
  myTask : Task = {
    ID : 0,
    task:'',
    done:false,
    starting:false
  }
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

  persisteTask()
  {
    this.taskService.persiste([this.myTask]).subscribe((task) => {
      this.taskss = [task, ...this.taskss];
      this.resetTask();
      this.showForm=false;
    })
  }

  resetTask()
  {
    this.myTask = 
    {
      ID : 0,
      task:'',
      done:false,
     starting:false
    }
  }

  modification( task : Task )
  {
    this.taskService.completed([task])
    .subscribe(() => {
      task.done = !task.done;
    })
  }
  modificationStarting( task : Task )
  {
    this.taskService.completed([task])
    .subscribe(() => {
      task.starting = !task.starting;
    })
  }
  
  editTask(task : Task)
  {
    this.myTask=task;
    this.editFrom=true;
    this.showForm=true;
  }

  updateTask()
  {
    this.taskService.update([this.myTask])
    .subscribe(() => {
        this.resetTask();
        this.editFrom=false;
    })
  }
}
