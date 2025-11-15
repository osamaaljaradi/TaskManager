
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private tasks: Task[] = [];


  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);


  tasks$ = this.tasksSubject.asObservable().pipe(
    distinctUntilChanged()
  );

  constructor() {

  }


  addTask(task: Task): void {
    const nextId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
    const newTask: Task = { ...task, id: nextId };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }


  updateTaskStatus(id: number, status: TaskStatus): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, status } : task
    );
    this.tasksSubject.next(this.tasks);
  }


  getCurrentTasks(): Task[] {
    return this.tasks;
  }
}
