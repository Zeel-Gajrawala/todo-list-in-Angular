import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-addtodos',
  templateUrl: './addtodos.component.html',
  styleUrls: ['./addtodos.component.css']
})
export class AddtodosComponent implements OnInit {
  title : string;
  @Output() todoAdd : EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addTodo(){
    const todo = {
      title : this.title,
      active : true
    }
    this.todoAdd.emit(todo);
    this.title = '';
  }

}
