import { Injectable, Inject } from '@nestjs/common';
import { ITodoItemRepository } from '../repositories/todo-item.repository';
import { CreateToDoItemDTO } from '../dto/create.todo-item.dto';
import { TodoItemEntity } from 'src/Domain/Entity/todo-item.entity';
import { EmptySpecification } from '../specifications/EmptySpecification';
import { IdSpecification } from '../specifications/IdSpecifications';
import { UpdateTodoItemDTO } from '../dto/update.todo-item.dto';

@Injectable()
export class TodoItemService {
  constructor(
    @Inject('TodoItemRepository') private readonly repo: ITodoItemRepository,
  ) {}

  async createTodoItem(dto: CreateToDoItemDTO): Promise<TodoItemEntity> {
    const todoItem = new TodoItemEntity(dto);
    await this.repo.Save(todoItem);
    return todoItem;
  }

  async updateTodoItem(dto: UpdateTodoItemDTO): Promise<TodoItemEntity> {
    const entity = await this.repo.GetOne(new IdSpecification(dto._id));
    entity.update(dto.text, dto.deadline);
    return this.repo.Update(entity);
  }

  async makeDone(id: string): Promise<TodoItemEntity> {
    const entity = await this.repo.GetOne(new IdSpecification(id));
    entity.done();
    await this.repo.Save(entity);
    return entity;
  }

  async getTodoItems(options: {
    page?: number;
    limit?: number;
  }): Promise<TodoItemEntity[]> {
    const records = await this.repo.Get({
      specification: new EmptySpecification(),
      ...options,
    });
    return records.map((record) => new TodoItemEntity(record));
  }

  getTodoItemById(id: string): Promise<TodoItemEntity> {
    return this.repo.GetOne(new IdSpecification(id));
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      const entity = await this.repo.GetOne(new IdSpecification(id));
      entity.delete();
      await this.repo.Update(entity);
      return true;
    } catch (e) {
      return false;
    }
  }
}
