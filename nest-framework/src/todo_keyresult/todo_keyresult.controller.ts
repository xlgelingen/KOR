import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoKeyresultService } from './todo_keyresult.service';
import { CreateTodoKeyresultDto } from './dto/create-todo_keyresult.dto';
import { UpdateTodoKeyresultDto } from './dto/update-todo_keyresult.dto';

@Controller('todo-keyresult')
export class TodoKeyresultController {
  constructor(private readonly todoKeyresultService: TodoKeyresultService) {}

  @Post()
  create(@Body() createTodoKeyresultDto: CreateTodoKeyresultDto) {
    return this.todoKeyresultService.create(createTodoKeyresultDto);
  }

  @Get()
  findAll() {
    return this.todoKeyresultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoKeyresultService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoKeyresultDto: UpdateTodoKeyresultDto,
  ) {
    return this.todoKeyresultService.update(+id, updateTodoKeyresultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoKeyresultService.remove(+id);
  }
}
