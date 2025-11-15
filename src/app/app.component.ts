// src/app/app.component.ts
import { Component } from '@angular/core';
import { AddTaskComponent } from "./tasks/add-task/add-task.component";
import { TaskListComponent } from "./tasks/list-task/list-task.component";

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [AddTaskComponent, TaskListComponent]
})
export class AppComponent { }
