import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodosEntity } from './entities/todo.entity';
import { TodoKeyresultService } from '../todo_keyresult/todo_keyresult.service';
import { Todo_keyresultEntity } from '../todo_keyresult/entities/todo_keyresult.entity';
import { CreateTodoKeyresultDto } from '../todo_keyresult/dto/create-todo_keyresult.dto';

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

  async interlink(
    post: Partial<CreateTodoKeyresultDto>,
  ): Promise<Todo_keyresultEntity> {
    return await this.todoKeyresultService.create(post);
  }

  async findAll() {
    return this.todoRepository.find();
  }

  async setCompleted(id: number) {
    const existPost = await this.todoRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的目标不存在`, HttpStatus.NOT_FOUND);
    }
    existPost.isCompleted = true;
    return await this.todoRepository.save(existPost);
  }

  // async findById(id: number) {
  //   return await this.todoRepository.findOne({ where: { id } });
  // }

  // async update(id: number, updateObjective: Partial<UpdateTodoDto>) {
  //   const existPost = await this.todoRepository.findOne({ where: { id } });
  //   if (!existPost) {
  //     throw new HttpException(`id为${id}的目标不存在`, HttpStatus.NOT_FOUND);
  //   }
  //   const updatePost = this.todoRepository.merge(existPost, updateObjective);
  //   return this.todoRepository.save(updatePost);
  // }

  async remove(id: number) {
    const existPost = await this.todoRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的目标不存在`, HttpStatus.BAD_REQUEST);
    }
    return await this.todoRepository.remove(existPost);
  }
}
