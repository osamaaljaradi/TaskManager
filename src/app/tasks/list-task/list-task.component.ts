import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormControl } from '@angular/forms';
import { Task, TASK_STATUSES, TaskStatus } from '../models/task.model';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent {

 constructor(private taskService: TaskService) {}

  // إتاحة enum للقالب
  public TaskStatus = TaskStatus;

  // فلتر
  statusFilter = new FormControl<'All' | TaskStatus>('All', { nonNullable: true });
  filterOptions: ('All' | TaskStatus)[] = ['All', ...TASK_STATUSES];

  vm$ = combineLatest([
    this.taskService.tasks$,
    this.statusFilter.valueChanges.pipe(startWith(this.statusFilter.value))
  ]).pipe(
    map(([tasks, f]) => {
      const visible = f === 'All' ? tasks : tasks.filter(t => t.status === f);
      return { tasks: visible, total: tasks.length, visibleCount: visible.length };
    })
  );

  markInProgress(task: Task): void {
    if (task.status !== TaskStatus.InProgress) {
      this.taskService.updateStatus(task.id, TaskStatus.InProgress);
    }
  }

  markCompleted(task: Task): void {
    if (task.status !== TaskStatus.Completed) {
      this.taskService.updateStatus(task.id, TaskStatus.Completed);
    }
  }

  trackById(_: number, t: Task) { return t.id; }


}
