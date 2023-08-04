import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-addtodos',
  templateUrl: './addtodos.component.html',
  styleUrls: ['./addtodos.component.css']
})
export class AddtodosComponent implements OnInit {

  title: string;
  showError: boolean = false;
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  inputChange() {
    if (this.title && this.title.length > 0) {
      this.showError = false;
    }
  }

  addTodo() {
    if (this.title && this.title.length > 0) {
      const todo = {
        title: this.title,
        active: true
      }
      this.todoAdd.emit(todo);
      this.title = '';
    } else {
      this.showError = true;
    }
  }

}
