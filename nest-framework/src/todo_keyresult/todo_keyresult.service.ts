import { Injectable } from '@nestjs/common';
import { CreateTodoKeyresultDto } from './dto/create-todo_keyresult.dto';
import { UpdateTodoKeyresultDto } from './dto/update-todo_keyresult.dto';

@Injectable()
export class TodoKeyresultService {
  create(createTodoKeyresultDto: CreateTodoKeyresultDto) {
    return 'This action adds a new todoKeyresult';
  }

  findAll() {
    return `This action returns all todoKeyresult`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todoKeyresult`;
  }

  update(id: number, updateTodoKeyresultDto: UpdateTodoKeyresultDto) {
    return `This action updates a #${id} todoKeyresult`;
  }

  remove(id: number) {
    return `This action removes a #${id} todoKeyresult`;
  }
}
