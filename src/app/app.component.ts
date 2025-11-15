import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 showAdd = false;

  toggleAdd() {
    this.showAdd = !this.showAdd;
  }


  onAdded() {
    this.showAdd = false;
  }
}
