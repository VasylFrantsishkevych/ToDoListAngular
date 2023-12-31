import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ITodo} from "../types/todo.interface";
import {FilterEnum} from "../types/filter.enum";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos$ = new BehaviorSubject<ITodo[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all)

  addTodo(text: string): void {
    const newTodo: ITodo = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };
    const updatedTodos = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  toggleAll(isCompleted: boolean): void {
    const updateTodos = this.todos$.getValue().map(todo => {
      return {
        ...todo,
        isCompleted
      };
    });
    this.todos$.next(updateTodos);
  }

  changeFilter(filterName: FilterEnum) {
    this.filter$.next(filterName)
  }

  changeTodo(id: string, text: string) {
    const updateTodos = this.todos$.getValue().map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        }
      }
      return todo;
    });
    this.todos$.next(updateTodos);
  }

  removeTodo(id: string) {
    const updateTodos = this.todos$.getValue().filter(todo => todo.id !== id)
    this.todos$.next(updateTodos);
  }

  toggleTodo(id: string) {
    const updateTodos = this.todos$.getValue().map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        }
      }
      return todo
    });
    this.todos$.next(updateTodos);
  }
}
