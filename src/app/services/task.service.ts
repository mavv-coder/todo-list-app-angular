import { Injectable } from '@angular/core';
import { getTaskList } from '../api/mock-data';
import { of, Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskList: Task[];
  currentTask: Task;

  constructor() {
    getTaskList().subscribe((data) => {
      this.taskList = data;
    });
    this.currentTask = { name: '', id: '' };
  }

  getTaskList(): Observable<Task[]> {
    return of(this.taskList);
  }

  addNewTask(name: string): void {
    const newTask = { name, id: this.generateId() };
    this.taskList.push(newTask);
  }

  deleteTask(id: string): void {
    const index = this.taskList.findIndex((x) => x.id === id);
    this.taskList.splice(index, 1);
  }

  clearCurrentTask() {
    this.currentTask.name = '';
    this.currentTask.id = '';
  }

  selectEditTask(task: Task): void {
    this.currentTask.name = task.name;
    this.currentTask.id = task.id;
  }

  editTask(task: Task): void {
    const index = this.taskList.findIndex((x) => x.id === this.currentTask.id);
    this.taskList.splice(index, 1, task);
  }

  getCurrentTask(): Observable<Task> {
    return of(this.currentTask);
  }

  generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
