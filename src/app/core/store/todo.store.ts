import { Injectable, signal } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoStore {

  // 🔥 central state
  todos = signal<Todo[]>([]);

  // derived signals (computed manually)
  todoList = () => this.todos().filter(t => t.status === 'TODO');
  inProgressList = () => this.todos().filter(t => t.status === 'IN_PROGRESS');
  doneList = () => this.todos().filter(t => t.status === 'DONE');

  // set all (initial load)
  setTodos(data: Todo[]) {
    this.todos.set(data);
  }

  // add one
  add(todo: Todo) {
    this.todos.update(list => [todo, ...list]);
  }

  // add many (AI)
  addMany(todos: Todo[]) {
    this.todos.update(list => [...todos, ...list]);
  }

  // update
  update(updated: Todo) {
    this.todos.update(list =>
      list.map(t => t.id === updated.id ? updated : t)
    );
  }

  // delete
  delete(id: number) {
    this.todos.update(list => list.filter(t => t.id !== id));
  }
}