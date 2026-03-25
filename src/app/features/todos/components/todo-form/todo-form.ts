import { Component, EventEmitter, Output } from '@angular/core';
import { TodoApiService } from '../../../../core/services/todo-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Todo } from '../../../../shared/models/todo.model';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
    title = '';

    @Output() todoAdded = new EventEmitter<Todo>();

    constructor(private api: TodoApiService) {}

    add() {
      const newTodo: Todo = {
        title: this.title,
        status: 'TODO'
      };

      this.api.create(newTodo).subscribe(saved => {
        this.todoAdded.emit(saved); 
      });

      this.title = '';
    }
}
