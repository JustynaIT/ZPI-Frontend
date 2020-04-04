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
import { ProjectsShowComponent } from './components/projects/projects-show/projects-show.component';

const roles = {
    A: ['ADMIN'],
    ALC: ['ADMIN', 'LEADER', 'CLIENT'],
    ALL: ['ADMIN', 'CLIENT', 'LEADER', 'WORKER']
};

const routes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'auth', component: MainComponent,
        children: [{
                path: 'tasks',
                children: [
                    {
                        path: '',
                        component: TasksIndexComponent,
                        canActivate: [AuthGuard],
                        data: { roles: roles.ALL }
                    },
                    {
                        path: 'create',
                        component: TasksCreateComponent,
                        canActivate: [AuthGuard],
                        data: { roles: roles.ALL }
                    },
                    {
                        path: 'edit/:id',
                        component: TasksEditComponent,
                        canActivate: [AuthGuard],
                        data: { roles: roles.ALL }
                    }
                ]
            }, {
                path: 'projects',
                children: [{
                        path: '',
                        component: ProjectsIndexComponent,
                        pathMatch: 'full',
                        canActivate: [AuthGuard],
                        data: { roles: roles.A }
                    },
                    {
                        path: 'create',
                        component: ProjectsCreateComponent,
                        canActivate: [AuthGuard],
                        data: { roles: roles.A }
                    },
                    {
                        path: 'edit/:id',
                        component: ProjectsEditComponent,
                        canActivate: [AuthGuard],
                        data: { roles: roles.ALC },
                     },
                    {
                        path: 'show/:id',
                        component: ProjectsShowComponent,
                        canActivate: [AuthGuard],
                        data: { roles: roles.A }
                    },
                    {
                        path: 'show',
                        component: ProjectsShowComponent,
                        canActivate: [AuthGuard],
                        data: { roles: roles.ALL }
                    },
                ]
            },
            {
                path: 'add-user',
                component: AddUserComponent,
                canActivate: [AuthGuard],
                data: { roles: roles.A }
            }
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
