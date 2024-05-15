import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodosEntity } from './entities/todo.entity';
import { TodoKeyresultService } from '../todo_keyresult/todo_keyresult.service';
// import { Todo_keyresultEntity } from '../todo_keyresult/entities/todo_keyresult.entity';
// import { CreateTodoKeyresultDto } from '../todo_keyresult/dto/create-todo_keyresult.dto';
import * as moment from 'moment';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodosEntity)
    private readonly todoRepository: Repository<TodosEntity>,
    private todoKeyresultService: TodoKeyresultService,
  ) {}

  async create(post: Partial<CreateTodoDto>): Promise<TodosEntity> {
    if (!post.content) {
      throw new HttpException('缺少内容', HttpStatus.BAD_REQUEST);
    }
    return await this.todoRepository.save(post);
  }

  // async interlink(
  //   post: Partial<CreateTodoKeyresultDto>,
  // ): Promise<Todo_keyresultEntity> {
  //   return await this.todoKeyresultService.create(post);
  // }

  //其他表格需要改这里
  async findAll() {
    const datas = await this.todoRepository.find();
    const dataInfo = datas.map((data) => {
      const create_time = moment(data.create_time).format('YYYY/MM/DD HH:mm');
      let completed_time = '';
      if (data.completed_time) {
        completed_time = moment(data.completed_time).format('YYYY/MM/DD HH:mm');
      }
      const Info = { ...data, create_time, completed_time };
      return Info;
    });
    return dataInfo;
  }

  async findById(id: number) {
    return await this.todoRepository.find({ where: { id } });
  }

  // async findArr(post: Partial<CreateTodoDto>) {
  //   const todos = post.todos;
  //   const todoInfos: TodosEntity[] = [];
  //   for (const todo of todos) {
  //     const todoInfo = new TodosEntity();
  //     todoInfo.content = todo;
  //     todoInfos.push(todoInfo);
  //   }

  //   return await this.todoRepository.save(todoInfos);
  // }

  //其他表格还需要改这里
  async setCompleted(id: number) {
    const existPost = await this.todoRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的目标不存在`, HttpStatus.NOT_FOUND);
    }
    existPost.isCompleted = true;
    existPost.completed_time = new Date();
    return await this.todoRepository.save(existPost);
  }

  async remove(id: number) {
    const existPost = await this.todoRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的目标不存在`, HttpStatus.BAD_REQUEST);
    }
    return await this.todoRepository.remove(existPost);
  }
}
