import { Component } from '@angular/core';
import { TodoDataService} from './todo-data.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // TodoDataService is declared in the app.module.ts, so it is available to ALL components in the entire application.
  providers: [],
})
export class AppComponent {
  title = 'todo-list';

  newTodo: Todo = new Todo();

  // Ask Angular DI system to inject the dependency
  // associated with the dependency injection token `TodoDataService`
  // and assign it to a property called `todoDataService`
  // The use of public or private on arguments in the constructor
  // is a shorthand notation that allows us to automatically create properties with that name
  constructor(private todoDataService: TodoDataService) {

  }

  /*addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }*/

  // Handle event emitted by TodoListHeaderComponent
  onAddTodo(todo: Todo) {
    this.todoDataService.addTodo(todo);
  }

  /*
  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }
  */

  onToggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  /*
  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }
  */

  onRemoveTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }
}
