import { Component, signal,OnInit  } from '@angular/core';
import { TodoApiService } from '../../../../core/services/todo-api.service';
import { Todo } from '../../../../shared/models/todo.model';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { TodoStore } from '../../../../core/store/todo.store';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})

export class TodoList implements OnInit  {
  todoList: Todo[] = [];
  inProgressList: Todo[] = [];
  doneList: Todo[] = [];

  constructor(public store: TodoStore,private api: TodoApiService) {
    this.load();
  }

  ngOnInit() {
    this.api.getAll().subscribe(data => {
      this.store.setTodos(data);
    });
  }
  
  load() {
    this.api.getAll().subscribe(data => {
      this.todoList = data.filter(t => t.status === 'TODO');
      this.inProgressList = data.filter(t => t.status === 'IN_PROGRESS');
      this.doneList = data.filter(t => t.status === 'DONE');
    });
  }

  drop(event: CdkDragDrop<any>, status: string) {

    if (event.previousContainer === event.container) return;

    const item = event.previousContainer.data[event.previousIndex];

    // update status
    item.status = status as any;

    // update store (THIS IS KEY)
    this.store.update(item);

    // backend sync
    this.api.update(item).subscribe();
  }

  delete(id: number) {

  this.store.delete(id);

  this.api.delete(id).subscribe();
}

  reloadTodos() {
    this.load();
  }

  addLocal(todo: Todo) {
    if (todo.status === 'TODO') {
      this.todoList.unshift(todo); // 👈 add at top (better UX)
    } else if (todo.status === 'IN_PROGRESS') {
      this.inProgressList.unshift(todo);
    } else {
      this.doneList.unshift(todo);
    }
  }
}
