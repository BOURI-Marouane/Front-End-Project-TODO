import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http:HttpClient) { }
  findAll()
  {
    return this.http.post<any>("http://127.0.0.1/rest/Task/ALL",[])
  }
  delete([id]:[number])
  {
    console.log(id);
    return this.http.post<any>("http://127.0.0.1/rest/Task/delete",[id])
  }

  persiste([task] : [Task])
  {
    return this.http.post<any>("http://127.0.0.1/rest/Task/create",[task])
  }
}
  