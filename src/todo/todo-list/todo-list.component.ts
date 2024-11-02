import { Component, ViewChild, ElementRef } from '@angular/core';
import { TodoListItem } from '../todo-list-item.component';
import gsap from 'gsap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  imports: [TodoListItem, FormsModule],
})
export class TodoList {
  inputValue: string = '';
  todoListItems: TodoListItemType[] = localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items')!)
    : [
        { id: 1, title: 'Perform Fajr prayer', done: false },
        { id: 2, title: 'Read Quran for 15 minutes', done: false },
        { id: 3, title: 'Give charity to someone in need', done: false },
        { id: 4, title: 'Help a family member with a task', done: false },
        { id: 5, title: 'Memorize a new dua', done: false },
        {
          id: 6,
          title: 'Reflect on the names of Allah (Asma ul Husna)',
          done: false,
        },
        {
          id: 7,
          title: 'Perform Dhikr in the morning and evening',
          done: false,
        },
        { id: 8, title: 'Perform extra Sunnah prayers', done: false },
        {
          id: 9,
          title: 'Plan a time for personal dua and reflection',
          done: false,
        },
        {
          id: 10,
          title: 'Reach out to a friend or relative to maintain ties',
          done: false,
        },
      ];

  addItem() {
    this.todoListItems = [
      {
        id: this.todoListItems.length + 1,
        title: this.inputValue,
        done: false,
      },
      ...this.todoListItems,
    ];

    localStorage.setItem('items', JSON.stringify(this.todoListItems));

    this.inputValue = '';
  }

  deleteItem(id: number) {
    const item = document.getElementById(`item-${id}`);

    if (item) {
      gsap.to(item, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        onComplete: () => {
          const newTodoList = this.todoListItems.filter(
            (item) => item.id != id
          );
          this.todoListItems = newTodoList;
          localStorage.setItem('items', JSON.stringify(this.todoListItems));
        },
      });
    }
  }

  checkItem({ id, check }: { id: number; check: boolean }) {
    const item = this.todoListItems.find((item) => item.id === id);
    if (item) {
      item.done = check;
    }

    localStorage.setItem('items', JSON.stringify(this.todoListItems));
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
        scale: 1,
      }
    );
  }
}

type TodoListItemType = {
  id: number;
  title: string;
  done: boolean;
};
