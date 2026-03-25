import { Component, EventEmitter, Output } from '@angular/core';
import { AiApiService } from '../../../core/services/ai-api.service';
import { CommonModule } from '@angular/common';
import { TodoApiService } from '../../../core/services/todo-api.service';
import { Todo } from '../../../shared/models/todo.model';
import { forkJoin } from 'rxjs';
import { TodoStore } from '../../../core/store/todo.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai',
   standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai.html',
  styleUrl: './ai.css',
})
export class Ai {

  todos: Todo[] = []; 
  inputText = ''; // holds textarea value
  @Output() todosCreated = new EventEmitter<Todo[]>; 

  constructor(
    private api: AiApiService,
    private todoApi: TodoApiService,
    private store: TodoStore
  ) {}

  generate() {

    if (!this.inputText.trim()) return;

    this.api.generate(this.inputText).subscribe((todos) => {

      // update UI instantly
      this.store.addMany(todos);

      // backend save
      todos.forEach(t => {
        this.todoApi.create(t).subscribe(saved => {
          this.store.update(saved);
        });
      });

      // CLEAR INPUT FIELD
      this.inputText = '';  
    });
  }
}
