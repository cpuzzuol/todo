import { Component, OnInit } from '@angular/core';
import { TodoDataService} from './todo-data.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // TodoDataService is declared in the app.module.ts, so it is available to ALL components in the entire application.
  providers: [],
})
export class AppComponent implements OnInit {
  title = 'todo-list';

  todos: Todo[] = [];

  // Ask Angular DI system to inject the dependency
  // associated with the dependency injection token `TodoDataService`
  // and assign it to a property called `todoDataService`
  // The use of public or private on arguments in the constructor
  // is a shorthand notation that allows us to automatically create properties with that name
  constructor(private todoDataService: TodoDataService) {

  }

  public ngOnInit() {
    this.todoDataService
      .getAllTodos()
      .subscribe((todos) => this.todos = todos);
  }

  // Handle event emitted by TodoListHeaderComponent
  onAddTodo(todo: Todo) {
    this.todoDataService
      .addTodo(todo)
      // .subscribe is for ASYNCHRONOUS nature of the OBSERVABLE returned by the API call
      .subscribe((newTodo) => this.todos.concat(newTodo));
  }

  onToggleTodoComplete(todo) {
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe((updateTodo) => todo = updateTodo);
  }

  onRemoveTodo(todo) {
    this.todoDataService
      .deleteTodoById(todo.id)
      .subscribe((_) => {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
      });
  }
}
