import { Module } from '@nestjs/common';
import { TodoItemService } from './services/todo-item-service';
import { InfrastructureModule } from 'src/Infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [TodoItemService],
  exports: [TodoItemService],
})
export class ApplicationModule {}
