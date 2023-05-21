import { Module } from '@nestjs/common';
import { TodoItemRepoProvider } from './repositories/providers';
import { dbProvider } from './schema/db.provider';

@Module({
  imports: [dbProvider],
  providers: [TodoItemRepoProvider],
  exports: [TodoItemRepoProvider],
})
export class InfrastructureModule {}
