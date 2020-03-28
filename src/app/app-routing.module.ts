import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { TasksIndexComponent } from './components/tasks/tasks-index/tasks-index.component';
import { TasksCreateComponent } from './components/tasks/tasks-create/tasks-create.component';
import { TasksEditComponent } from './components/tasks/tasks-edit/tasks-edit.component';
import { AuthGuard } from './guards/auth.guard';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ProjectsIndexComponent } from './components/projects/projects-index/projects-index.component';
import { ProjectsCreateComponent } from './components/projects/projects-create/projects-create.component';
import { ProjectsEditComponent } from './components/projects/projects-edit/projects-edit.component';

const routes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'auth', component: MainComponent, canActivate: [AuthGuard],
        children: [{
                path: '',
                children: [
                    { path: 'tasks', component: TasksIndexComponent,  },
                    { path: 'tasks/create', component: TasksCreateComponent },
                    { path: 'tasks/edit/:id', component: TasksEditComponent }
                ]
            }, {
                path: '',
                children: [
                    { path: 'projects', component: ProjectsIndexComponent, pathMatch: 'full' },
                    { path: 'projects/create', component: ProjectsCreateComponent },
                    { path: 'projects/edit/:id', component: ProjectsEditComponent },
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
