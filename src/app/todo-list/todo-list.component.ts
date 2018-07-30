import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  // Allows injection of Todos FROM parent component (AppComponent)
  @Input()
  todos: Todo[];

  // Allows events to be emitted TO parent component (AppComponent)
  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  onToggleTodoComplete(todo: Todo){
    this.toggleComplete.emit(todo);
  }

  onRemoveTodo(todo: Todo){
    this.remove.emit(todo);
  }

  ngOnInit() {
  }

}
