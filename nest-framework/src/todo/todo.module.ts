import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoKeyresultModule } from '../todo_keyresult/todo_keyresult.module';
import { TodosEntity } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodosEntity]), TodoKeyresultModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
