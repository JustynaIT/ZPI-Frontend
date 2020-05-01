import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { PageEvent, MatSnackBar, MatDialog } from '@angular/material';
import { TasksService } from 'src/app/services/tasks.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { RemoveDialogComponent } from 'src/app/dialogs/remove-dialog/remove-dialog.component';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input() project;
  @Input() tasks;
  @Input() usersProject;
  @Output() fetchProject: EventEmitter<any> = new EventEmitter();
  @Output() fetchTasks: EventEmitter<any> = new EventEmitter();
  @ViewChild(TaskFormComponent, {static: false}) taskForm: TaskFormComponent;

  public isEditEnable = false;
  public isAddEnable = false;
  public indexEditTask: number;
  pageEvent: PageEvent;
  public paginator = {
    length: 100,
    pageSize: 5,
    pageSizeOptions: [5],
    pageIndex: 0,
  };

  constructor(private tasksS: TasksService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private projectS: ProjectsService,
              private validators: ValidatorsService) { }

  ngOnInit() {
  }

  public enableEditing(id: number) {
    this.isEditEnable = true;
    this.indexEditTask = this.tasks.findIndex(task => task.id === id);
    this.tasks[this.indexEditTask].isEdit = !this.tasks[this.indexEditTask].isEdit;
    setTimeout(() => {
      this.taskForm.setDataForm(this.tasks[this.indexEditTask]);
    });
  }

  public saveTask(id) {
    const taskForm = this.taskForm.getForm();

    this.tasksS.edit(id, taskForm.value).subscribe({
      next: () => {
        this.tasks[this.indexEditTask].isEdit = false;
        this.isEditEnable = false;
        this.fetchTasks.emit();
        this.fetchProject.emit();
        this.tasks[this.indexEditTask].isEdit = false;
        this.isEditEnable = false;
        this.snackBar.open('task edited', 'close', {
            duration: 2000,
            panelClass: ['color-snackbar']
          });
      },
      error: (error) => {
        this.validators.handlerError(error);
      },
    });
  }

  public cancelEditTask() {
    this.tasks[this.indexEditTask].isEdit = false;
    this.isEditEnable = false;
  }

  public enableAdd() {
    this.isAddEnable = true;
  }

  public addTask() {
    const taskForm = this.taskForm.getForm();

    this.tasksS.create({project_id: this.project.id, ...taskForm.value}).subscribe({
      next: () => {
        this.fetchTasks.emit();
        this.fetchProject.emit();
        this.taskForm.reset();
        this.validators.clear2();
        this.isAddEnable = false;
        this.snackBar.open('task added', 'close', {
          duration: 2000,
          panelClass: ['color-snackbar']
        });
      },
      error: (error) => {
        this.validators.handlerError(error);
      }
    });
  }

  public cancelAddTask() {
    this.isAddEnable = false;
  }

  public setIcon(status): string {
    if (status === 'in_progress') {
      return 'update';
    } else if (status === 'done' ) {
      return 'done';
    } else {
      return 'report';
    }
  }

  public setColor(priority, status): string  {
    if (status === 'done') {
      return '#4aff29';
    } else if (priority === 'urgent') {
      return '#ff2929';
    } else if (priority === 'high' ) {
      return '#ff6429';
    } else if (priority === 'medium' ) {
      return '#ffb329';
    } else {
      return '#f3cd74';
    }
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasksS.delete(id).subscribe(() => {
          this.fetchTasks.emit();
          this.fetchProject.emit();
          this.paginator.pageIndex = 0;
          this.snackBar.open('Task remove', 'close', {
            duration: 2000,
            panelClass: ['color-snackbar']
          });
        });
      }
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.paginator.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  handlePage(event) {
    this.fetchTasks.emit(event.pageIndex);
  }

  setPaginator(total) {
    this.paginator.length = total;
  }
}
