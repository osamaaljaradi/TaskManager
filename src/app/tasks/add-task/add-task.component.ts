// src/app/components/add-task/add-task.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { TaskStatus } from '../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {

  taskForm: FormGroup;

  // نستخدم الـ enum في الـ template
  statusOptions = [
    TaskStatus.Pending,
    TaskStatus.InProgress,
    TaskStatus.Completed
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: [TaskStatus.Pending, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.taskService.addTask(this.taskForm.value);
    this.taskForm.reset({
      title: '',
      description: '',
      status: TaskStatus.Pending
    });
  }
}
