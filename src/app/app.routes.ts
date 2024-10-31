import { Routes } from '@angular/router';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { TodoList } from '../todo/todo-list/todo-list.component';

export const routes: Routes = [
    {
        path: "",
        component: TodoList
    },
    {
        path: "heroes-list",
        component: HeroesListComponent,
    }
];
