import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { TasksIndexComponent } from './components/tasks/tasks-index/tasks-index.component';
import { TasksCreateComponent } from './components/tasks/tasks-create/tasks-create.component';
import { TasksEditComponent } from './components/tasks/tasks-edit/tasks-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'auth', component: MainComponent, canActivate: [AuthGuard],
        children: [{
                path: 'tasks', component: TasksIndexComponent, pathMatch: 'full',
                children: [
                    { path: '', component: TasksIndexComponent, pathMatch: 'full' },
                    { path: 'create', component: TasksCreateComponent },
                    { path: 'edit/:id', component: TasksEditComponent }
                ]
            },
            { path: 'add-user', component: AddUserComponent }
        ],
       /*  {
            path: "**",
            component: PageNotFoundComponent
        } */
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
