import { TodoItemRepository } from './todo-item.repository';

export const TodoItemRepoProvider = {
  provide: 'TodoItemRepository',
  useClass: TodoItemRepository,
};
