import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly _tasks$ = new BehaviorSubject<Task[]>([]);
  private _idCounter = 1;

  readonly tasks$: Observable<Task[]> =
    this._tasks$.asObservable().pipe(shareReplay({ bufferSize: 1, refCount: true }));

  add(input: Omit<Task, 'id'>): void {
    const next: Task = { id: this._idCounter++, ...input };
    this._tasks$.next([...this._tasks$.value, next]);
  }

  updateStatus(id: number, status: TaskStatus): void {
    const updated = this._tasks$.value.map(t => (t.id === id ? { ...t, status } : t));
    this._tasks$.next(updated);
  }

  filtered(status: TaskStatus | 'All'): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => (status === 'All' ? tasks : tasks.filter(t => t.status === status)))
    );
  }

  snapshot(): Task[] {
    return this._tasks$.value;
  }
}
