import { Component, OnInit } from '@angular/core';
import {TaskService} from "../services/task.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService]

})
export class TaskComponent implements OnInit {
  tasks: any;
  name: string;
  complete: boolean;
  priority: number

  constructor(private taskService: TaskService) { }

  ngOnInit()
  {
    showForm: false
    this.getTasks()
  }
  getTasks(): void {
    this.taskService.getTasks().subscribe(res => {
      console.log(res);
      this.tasks = res;
    }, err => {
      console.log(err);
    })
  }
  addTask(): void {
    //create new task obj
    let newTask = {
      name: this.name,
      complete: this.complete,
      priority: this.priority
    }
    // call the service to add a task (which will call the server expresss api in turn)
    // then refresh the task list
    this.taskService.addTask(newTask).subscribe(response => {
      this.getTasks()

    })
  }
}