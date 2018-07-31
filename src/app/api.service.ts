
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Todo } from './todo';

import {catchError, map, take} from 'rxjs/operators';


const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getAllTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(API_URL + '/todos')
      .pipe(
        map(response => {
          return response.map((todo) => new Todo(todo));
        }),
        catchError(this.handleError)
      );
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(API_URL + '/todos', todo)
      .pipe(
        map((response: Todo) => {
          return new Todo(response);
        }),
        catchError(this.handleError)
      );
  }

  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get<Todo>(API_URL + '/todos/' + todoId)
      .pipe(
        map((response: Todo) => {
          return new Todo(response);
        }),
        catchError(this.handleError)
      );
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put<Todo>(API_URL + '/todos/' + todo.id, todo)
      .pipe(
        map( response => {
          return new Todo(response);
        }),
        catchError(this.handleError)
      );
  }

  public deleteTodoById(todoId: number): Observable<null> {
    return this.http
      .delete(API_URL + '/todos/' + todoId)
      .pipe(
        map(response => null),
        catchError(this.handleError)
      );
  }

  private handleError (error: HttpResponse<any>) {
    console.error('ApiService::handleError', error);
    return observableThrowError(error);
  }
}
