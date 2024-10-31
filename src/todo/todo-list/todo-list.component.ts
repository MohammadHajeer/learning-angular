import { Component, ViewChild, ElementRef } from '@angular/core';
import { TodoListItem } from '../todo-list-item.component';
import gsap from 'gsap';

@Component({
  selector: 'todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  imports: [TodoListItem],
})
export class TodoList {
  inputValue: string = 'w';
  todoListItems: TodoListItemType[] = [
    { id: 1, title: 'Buy groceries', done: false },
    { id: 2, title: 'Clean the house', done: false },
    { id: 3, title: 'Finish homework', done: true },
    { id: 4, title: 'Walk the cat', done: false },
    { id: 5, title: 'Prepare for the meeting', done: true },
  ];

  addItem(title: string, event: Event) {
    event.preventDefault();
    this.todoListItems = [
      ...this.todoListItems,
      {
        id: this.todoListItems.length + 1,
        title,
        done: false,
      },
    ];
  }

  @ViewChild('todoList', { static: false }) todoList!: ElementRef;

  ngAfterViewInit() {
    gsap.fromTo(
      this.todoList.nativeElement,
      { opacity: 0, y: 500, scale: 1.4 },
      {
        opacity: 1,
        y: 0,
        ease: 'back.out',
        scale: 1
      }
    );
  }
}

type TodoListItemType = {
  id: number;
  title: string;
  done: boolean;
};
