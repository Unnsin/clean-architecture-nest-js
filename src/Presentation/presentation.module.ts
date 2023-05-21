import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/Application/application.module';
import { TodoItemController } from './controllers/todo-item.controller';

@Module({
  imports: [ApplicationModule],
  providers: [],
  controllers: [TodoItemController],
  exports: [],
})
export class PresentationModule {}
