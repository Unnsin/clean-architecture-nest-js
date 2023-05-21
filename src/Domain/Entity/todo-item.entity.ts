import { DeadlineExpireException } from '../Exception/todo-item.deadline-expire';
import { NotExist } from '../Exception/todo-item.not-exist';

export class TodoItemEntity {
  _id: string;
  text: string;
  deadline?: Date;
  isDone: boolean;
  isDeleted: boolean;

  constructor(partial: Partial<TodoItemEntity>) {
    this._id = partial._id;
    this.text = partial.text;
    this.deadline = partial.deadline;
    this.isDone = false;
    this.isDeleted = false;
  }

  done() {
    if (this.deadline && this.deadline.getTime() < new Date().getTime()) {
      throw new DeadlineExpireException();
    }

    if (this.isDeleted) {
      throw new NotExist();
    }

    this.isDone = true;
  }

  delete() {
    this.isDeleted = true;
  }

  update(text: string, deadline?: Date) {
    this.text = text;
    this.deadline = deadline;
  }
}
