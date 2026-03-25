import { Component, EventEmitter, Output } from '@angular/core';
import { AiApiService } from '../../../core/services/ai-api.service';
import { CommonModule } from '@angular/common';
import { TodoApiService } from '../../../core/services/todo-api.service';
import { Todo } from '../../../shared/models/todo.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ai',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './ai.html',
  styleUrl: './ai.css',
})
export class Ai {

  todos: Todo[] = []; 
  @Output() todosCreated = new EventEmitter<void>(); 

  constructor(
    private api: AiApiService,
    private todoApi: TodoApiService
  ) {}

  generate(text: string) {
    this.api.generate(text).subscribe((todos) => {

      const calls = todos.map(t => this.todoApi.create(t));

      forkJoin(calls).subscribe(() => {
        this.todosCreated.emit(); // notify once ✅
      });

    });
  }
}
