import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoApiService } from '../../../core/services/todo-api.service';
import { loadTodos, loadTodosSuccess } from './todo.actions';
import { switchMap, map } from 'rxjs';

@Injectable()
export class TodoEffects {

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() => this.api.getAll()
        .pipe(map(todos => loadTodosSuccess({ todos }))))
    )
  );

  constructor(private actions$: Actions, private api: TodoApiService) {}
}