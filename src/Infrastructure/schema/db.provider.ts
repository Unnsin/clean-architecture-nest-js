import { MongooseModule } from '@nestjs/mongoose';
import { TodoItemSchema } from './todo-item.schema';

export const dbProvider = MongooseModule.forFeature([
  { name: 'TodoItemModel', schema: TodoItemSchema },
]);
