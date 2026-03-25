import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../shared/models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoApiService {

  private base = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Todo[]>(this.base);
  }

  create(todo: Todo) {
    return this.http.post<Todo>('http://localhost:8080/api/todos', todo);
  }

  toggle(id: number) {
    return this.http.put(`${this.base}/${id}/toggle`, {});
  }

  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  update(todo: Todo) {
  return this.http.put(`${this.base}/${todo.id}`, todo);
}
}