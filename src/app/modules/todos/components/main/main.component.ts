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

  constructor(private todosService:TodosService) {
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
}
