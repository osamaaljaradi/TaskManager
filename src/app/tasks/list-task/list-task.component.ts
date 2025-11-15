
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-list-task',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  selectedStatus: 'All' | TaskStatus = 'All';

  private destroy$ = new Subject<void>();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    this.taskService.tasks$
      .pipe(
        map(tasks => {
          this.tasks = tasks;
          return this.applyFilter(tasks, this.selectedStatus);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(filtered => {
        this.filteredTasks = filtered;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFilterChange(): void {
    this.filteredTasks = this.applyFilter(this.tasks, this.selectedStatus);
  }

  private applyFilter(tasks: Task[], status: 'All' | TaskStatus): Task[] {
    if (status === 'All') {
      return tasks;
    }
    return tasks.filter(task => task.status === status);
  }

  setInProgress(task: Task): void {
    if (task.status !== TaskStatus.InProgress && task.status !== TaskStatus.Completed) {
      this.taskService.updateTaskStatus(task.id, TaskStatus.InProgress);
    }
  }

  setCompleted(task: Task): void {
    if (task.status !== TaskStatus.Completed) {
      this.taskService.updateTaskStatus(task.id, TaskStatus.Completed);
    }
  }

  readonly TaskStatus = TaskStatus; 
}
