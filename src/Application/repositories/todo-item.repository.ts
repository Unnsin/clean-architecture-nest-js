import { TodoItemEntity } from 'src/Domain/Entity/todo-item.entity';
import { BaseRepository } from '../shared/BaseRepository';

export interface ITodoItemRepository extends BaseRepository<TodoItemEntity> {}
