import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ITodo} from "../../types/todo.interface";
import {TodosService} from "../../services/todos.service";

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {

  @Input() todo: ITodo;
  @Input() isEditing: boolean;

  @Output() setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();

  editingText: string = '';

  @ViewChild('textInput') textInput: ElementRef;

  constructor(private todosService:TodosService) {
  }

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isEditing.currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode() {
    this.setEditingIdEvent.emit(this.todo.id);
  }

  removeTodo() {
    this.todosService.removeTodo(this.todo.id);
  }

  toggleTodo() {
    this.todosService.toggleTodo(this.todo.id);
  }

  changeText(event: Event) {
    this.editingText = (event.target as HTMLInputElement).value;
  }

  changeTodo() {
    this.todosService.changeTodo(this.todo.id, this.editingText)
    this.setEditingIdEvent.emit(null);
  }

}
