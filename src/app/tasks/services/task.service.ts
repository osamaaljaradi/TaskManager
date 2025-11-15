// src/app/services/task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // الحالة الداخلية
  private tasks: Task[] = [];

  // BehaviorSubject يَحمل قائمة المهام
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  // observable مع distinctUntilChanged (لتلبية شرط RxJS)
  tasks$ = this.tasksSubject.asObservable().pipe(
    distinctUntilChanged()
  );

  constructor() {
    // مهام تجريبية مبدئية
    this.tasks = [
      {
        id: 1,
        title: 'Finish report',
        description: 'Complete project report',
        status: TaskStatus.Pending
      },
      {
        id: 2,
        title: 'Review code',
        description: 'Review pull requests',
        status: TaskStatus.InProgress
      },
      {
        id: 3,
        title: 'Write documentation',
        description: 'Update docs',
        status: TaskStatus.Completed
      }
    ];
    this.tasksSubject.next(this.tasks);
  }

  // إضافة مهمة جديدة
  addTask(task: Task): void {
    const nextId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
    const newTask: Task = { ...task, id: nextId };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
  }

  // تحديث حالة مهمة
  updateTaskStatus(id: number, status: TaskStatus): void {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, status } : task
    );
    this.tasksSubject.next(this.tasks);
  }

  // استرجاع القائمة الحالية (إذا احتجتها كسناب شوت)
  getCurrentTasks(): Task[] {
    return this.tasks;
  }
}
