import { Component, signal, ViewChild } from '@angular/core';
import { TodoList } from './features/todos/components/todo-list/todo-list';
import { TodoForm } from './features/todos/components/todo-form/todo-form';
import { Ai } from './features/ai/ai/ai';
import { CommonModule } from '@angular/common';
import { Todo } from './shared/models/todo.model';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,TodoList, TodoForm, Ai],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  @ViewChild(TodoList) todoList!: TodoList;

  onTodoAdded(todo: Todo) {
    this.todoList.addLocal(todo);
  }

  reloadTodos() {
    this.todoList.load(); // only for AI bulk
  }
}
