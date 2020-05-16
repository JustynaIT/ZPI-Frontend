import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { TasksIndexComponent } from './components/tasks/tasks-index/tasks-index.component';
import { TasksCreateComponent } from './components/tasks/tasks-create/tasks-create.component';
import { TasksEditComponent } from './components/tasks/tasks-edit/tasks-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatTableModule,
  MatToolbarModule, MatListModule, MatMenuModule,
  MatIconModule, MatProgressSpinnerModule, DateAdapter,
  MatNativeDateModule, MatGridListModule, MatTooltipModule, MatPaginatorModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { TokenInterceptor } from './interceptor/http.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { ProjectsIndexComponent } from './components/projects/projects-index/projects-index.component';
import { ProjectsCreateComponent } from './components/projects/projects-create/projects-create.component' ;
import { ProjectsService } from './services/projects.service';
import { ProjectsEditComponent } from './components/projects/projects-edit/projects-edit.component';
import { RemoveDialogComponent } from './dialogs/remove-dialog/remove-dialog.component';
import { ProjectsShowComponent } from './components/projects/projects-show/projects-show.component';
import { ProjectsRaportComponent } from './components/projects/projects-raport/projects-raport.component';
import { ProjectsDetailComponent } from './components/projects/components/projects-detail/projects-detail.component';
import { TasksComponent } from './components/projects/tasks/tasks/tasks.component';
import { TaskFormComponent } from './components/projects/tasks/components/task-form/task-form.component';
import { UsersIndexComponent } from './components/user/users-index/users-index.component';
import { UserFormComponent } from './components/user/components/user-form/user-form.component';
import { ProjectsDocumentsComponent } from './components/projects/projects-documents/projects-documents.component';
import { DocumentsService } from './services/documents.service';
import { ProfileUserComponent } from './components/user/profile-user/profile-user.component';

const MY_FORMATS = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY',
    },
  };

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MainComponent,
    HeaderComponent,
    TasksIndexComponent,
    TasksCreateComponent,
    TasksEditComponent,
    AddUserComponent,
    ProjectsIndexComponent,
    ProjectsCreateComponent,
    ProjectsEditComponent,
    RemoveDialogComponent,
    ProjectsShowComponent,
    ProjectsRaportComponent,
    ProjectsDetailComponent,
    TasksComponent,
    TaskFormComponent,
    UsersIndexComponent,
    UserFormComponent,
    ProjectsDocumentsComponent,
    ProfileUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatGridListModule,
    MatTooltipModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  entryComponents: [
    RemoveDialogComponent
  ],
  providers: [ ProjectsService, DocumentsService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
