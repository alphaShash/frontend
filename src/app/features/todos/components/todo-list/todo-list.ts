import { Component, signal } from '@angular/core';
import { TodoApiService } from '../../../../core/services/todo-api.service';
import { Todo } from '../../../../shared/models/todo.model';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  todoList: Todo[] = [];
  inProgressList: Todo[] = [];
  doneList: Todo[] = [];

  constructor(private api: TodoApiService) {
    this.load();
  }

  load() {
    this.api.getAll().subscribe(data => {
      this.todoList = data.filter(t => t.status === 'TODO');
      this.inProgressList = data.filter(t => t.status === 'IN_PROGRESS');
      this.doneList = data.filter(t => t.status === 'DONE');
    });
  }

  drop(event: CdkDragDrop<Todo[]>, status: string) {

    if (event.previousContainer !== event.container) {
      const item = event.previousContainer.data[event.previousIndex];

      item.status = status as any;

      // ⚡ update UI instantly
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // async backend update
      this.api.update(item).subscribe();
    }
  }

  delete(id: number) {
    this.api.delete(id).subscribe(() => this.load());
  }

  reloadTodos() {
    this.load();
  }

  addLocal(todo: Todo) {
    if (todo.status === 'TODO') {
      this.todoList.push(todo);
    } else if (todo.status === 'IN_PROGRESS') {
      this.inProgressList.push(todo);
    } else {
      this.doneList.push(todo);
    }
  }
}
