import { Component, EventEmitter, Output } from '@angular/core';
import { TodoApiService } from '../../../../core/services/todo-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Todo } from '../../../../shared/models/todo.model';
import { TodoStore } from '../../../../core/store/todo.store';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
    title = '';
    startTime = '';
    endTime = ''; 

    @Output() todoAdded = new EventEmitter<Todo>();

    constructor(
      private api: TodoApiService,
      private store: TodoStore
    ) {}

    add() {
      const newTodo: Todo = {   
        title: this.title,
        status: 'TODO',
        startTime: this.startTime, 
        endTime: this.endTime
      };

      // ⚡ instant UI
      this.store.add(newTodo);

      // async backend
      this.api.create(newTodo).subscribe(saved => {
        this.store.update(saved);
      });

      this.title = '';
      this.startTime = '';
      this.endTime = '';
    }
}
