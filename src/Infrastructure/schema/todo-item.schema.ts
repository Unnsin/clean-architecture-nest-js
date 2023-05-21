import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TodoItem {
  @Prop({ required: true })
  text: string;

  @Prop()
  isDeleted: boolean;

  @Prop()
  isDone: boolean;

  @Prop()
  deadline: Date;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
