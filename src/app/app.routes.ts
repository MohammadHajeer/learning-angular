import { Routes } from '@angular/router';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { TodoList } from '../todo/todo-list/todo-list.component';
import { authGuard } from './auth.guard';
// import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: "",
        component: TodoList,
    },
    {
        path: "heroes-list",
        component: HeroesListComponent,
        canActivate: [authGuard]
    },
    {
        path: "**",
        redirectTo: "/"
    }
];
