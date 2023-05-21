import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodoItemRepository } from 'src/Application/repositories/todo-item.repository';
import { GetParams } from 'src/Application/shared/BaseRepository';
import { ISpecification } from 'src/Application/shared/Specification';
import { TodoItemEntity } from 'src/Domain/Entity/todo-item.entity';
import { NoIdException } from '../exceptions/NoIdException';

@Injectable()
export class TodoItemRepository implements ITodoItemRepository {
  constructor(
    @InjectModel('TodoItemModel')
    private readonly todoItemModel: Model<TodoItemEntity>,
  ) {}

  async Get(param: GetParams<TodoItemEntity>): Promise<TodoItemEntity[]> {
    const query = this.todoItemModel.find(param.specification.isSatisfiedBy());
    if (param.limit && param.page) {
      query.skip(param.limit * (param.page - 1)).limit(param.limit);
    }
    const records = await query.lean();
    return records.map((record) => new TodoItemEntity(record));
  }

  async GetOne(specification: ISpecification): Promise<TodoItemEntity> {
    const record = await this.todoItemModel.findOne(
      specification.isSatisfiedBy(),
    );
    return new TodoItemEntity(record);
  }

  async Update(entity: TodoItemEntity): Promise<TodoItemEntity> {
    if (!entity._id) {
      throw new NoIdException();
    }
    const updatedRecord = await this.todoItemModel.findByIdAndUpdate(
      entity._id,
      entity,
      { new: true },
    );
    return new TodoItemEntity(updatedRecord);
  }

  async Delete(entity: TodoItemEntity): Promise<boolean> {
    if (!entity._id) {
      throw new NoIdException();
    }
    await this.todoItemModel.findByIdAndDelete(entity._id);
    return;
  }

  async Save(entity: TodoItemEntity): Promise<TodoItemEntity> {
    const record = await this.todoItemModel.create(entity);
    return new TodoItemEntity(record);
  }
}
