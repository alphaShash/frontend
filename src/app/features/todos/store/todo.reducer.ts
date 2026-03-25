import { createReducer, on } from '@ngrx/store';
import { loadTodosSuccess } from './todo.actions';
import { Todo } from '../../../shared/models/todo.model';

export interface State {
  todos: Todo[];
}

const initialState: State = {
  todos: []
};

export const todoReducer = createReducer(
  initialState,
  on(loadTodosSuccess, (state, { todos }) => ({ ...state, todos }))
);