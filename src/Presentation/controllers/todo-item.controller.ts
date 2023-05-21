import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateToDoItemDTO } from 'src/Application/dto/create.todo-item.dto';
import { UpdateTodoItemDTO } from 'src/Application/dto/update.todo-item.dto';
import { TodoItemService } from 'src/Application/services/todo-item-service';
import { TodoItemEntity } from 'src/Domain/Entity/todo-item.entity';

@Controller('/todo-item')
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}

  @Post()
  createTodoItem(@Body() body: CreateToDoItemDTO): Promise<TodoItemEntity> {
    return this.todoItemService.createTodoItem(body);
  }

  @Get()
  getTodoItems(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<TodoItemEntity[]> {
    return this.todoItemService.getTodoItems({ page, limit });
  }

  @Get('/:id')
  getTodoItemById(@Param('id') id: string): Promise<TodoItemEntity> {
    return this.todoItemService.getTodoItemById(id);
  }

  @Patch()
  updateTodoItem(@Body() body: UpdateTodoItemDTO): Promise<TodoItemEntity> {
    return this.todoItemService.updateTodoItem(body);
  }

  @Delete('/:id')
  deleteTodoItem(@Param('id') id: string): Promise<boolean> {
    return this.todoItemService.deleteById(id);
  }

  @Get('/done/:id')
  makeDoneById(@Param('id') id: string): Promise<TodoItemEntity> {
    return this.todoItemService.makeDone(id);
  }
}
