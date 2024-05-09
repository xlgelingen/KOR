import { Module } from '@nestjs/common';
import { TodoKeyresultService } from './todo_keyresult.service';
import { TodoKeyresultController } from './todo_keyresult.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo_keyresultEntity } from './entities/todo_keyresult.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo_keyresultEntity])],
  controllers: [TodoKeyresultController],
  providers: [TodoKeyresultService],
  exports: [TodoKeyresultService],
})
export class TodoKeyresultModule {}
