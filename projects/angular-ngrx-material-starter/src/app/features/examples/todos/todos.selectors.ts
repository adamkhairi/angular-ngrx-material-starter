import { createSelector } from '@ngrx/store';

import { ExamplesState, selectExamples } from '../examples.state';
import { Todo } from './todos.model';

export const selectTodosState = createSelector(
  selectExamples,
  (state: ExamplesState) => state.todos
);

export const selectTodosItems = createSelector(
  selectTodosState,
  (state) => state.items
);

export const selectTodosFilter = createSelector(
  selectTodosState,
  (state) => state.filter
);

export const selectTodos = createSelector(
  selectTodosItems,
  selectTodosFilter,
  (items, filter) => {
    if (filter === 'ALL') {
      return items;
    } else {
      const predicate =
        filter === 'DONE' ? (t: Todo) => t.done : (t: Todo) => !t.done;
      return items.filter(predicate);
    }
  }
);

export const selectRemoveDoneTodosDisabled = createSelector(
  selectTodosItems,
  (items) => !items.some((item) => item.done)
);
