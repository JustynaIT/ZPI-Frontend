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
  MatToolbarModule, MatListModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MainComponent,
    HeaderComponent,
    TasksIndexComponent,
    TasksCreateComponent,
    TasksEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
