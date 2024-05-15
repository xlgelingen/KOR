import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { TodoKeyresultService } from './todo_keyresult.service';
import { CreateTodoKeyresultDto } from './dto/create-todo_keyresult.dto';
// import { UpdateTodoKeyresultDto } from './dto/update-todo_keyresult.dto';

@Controller('todo-keyresult')
export class TodoKeyresultController {
  constructor(private readonly todoKeyresultService: TodoKeyresultService) {}

  @Get()
  findAll() {
    return this.todoKeyresultService.findAll();
  }

  @Post()
  createByArr(@Body() createTodoKeyresultDto: CreateTodoKeyresultDto) {
    return this.todoKeyresultService.createByArr(createTodoKeyresultDto);
  }

  @Post('select')
  select(@Body() post: CreateTodoKeyresultDto) {
    return this.todoKeyresultService.select(post);
  }

  @Delete()
  remove(@Body() post: CreateTodoKeyresultDto) {
    return this.todoKeyresultService.remove(post);
  }
}
