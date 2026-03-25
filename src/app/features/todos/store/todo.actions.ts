import { createAction, props } from '@ngrx/store';
import { Todo } from '../../../shared/models/todo.model';

export const loadTodos = createAction('[Todo] Load');
export const loadTodosSuccess = createAction(
  '[Todo] Load Success',
  props<{ todos: Todo[] }>()
);