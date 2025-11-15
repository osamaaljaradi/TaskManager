import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { TASK_STATUSES, TaskStatus } from '../models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {

 constructor(private fb: FormBuilder, private taskService: TaskService) {}

  statusOptions = TASK_STATUSES;
  

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    status: this.fb.nonNullable.control<TaskStatus>(TaskStatus.Pending)
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { title, description, status } = this.form.getRawValue();
    this.taskService.add({
      title: title.trim(),
      description: (description ?? '').trim(),
      status
    });
   this.form.reset({ title: '', description: '', status: TaskStatus.Pending });
  }

}
