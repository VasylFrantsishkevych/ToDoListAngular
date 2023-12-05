import {Component} from '@angular/core';
import {combineLatest, map, Observable} from "rxjs";
import {ITodo} from "../../types/todo.interface";
import {TodosService} from "../../services/todos.service";
import {FilterEnum} from "../../types/filter.enum";

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  visibleTodos$: Observable<ITodo[]>;
  noTodoClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>;
  editingId: string | null = null;

  constructor(private todosService:TodosService) {
    //check that all todos is completed and to do checkbox grey or dark
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    )
    // change class hidden
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0))

    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.todosService.filter$
    ).pipe(map(([todos, filter]: [ITodo[], FilterEnum]) => {
      if (filter === FilterEnum.active) {
        return todos.filter(todo => !todo.isCompleted)
      } else if (filter === FilterEnum.completed) {
        return todos.filter(todo => todo.isCompleted)
      }
      return todos;
    }))
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked)
  }

  setEditingId(editingId: string | null) {
    this.editingId = editingId;
  }
}
