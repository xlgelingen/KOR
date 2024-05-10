import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTodoKeyresultDto } from './dto/create-todo_keyresult.dto';
// import { UpdateTodoKeyresultDto } from './dto/update-todo_keyresult.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo_keyresultEntity } from './entities/todo_keyresult.entity';

@Injectable()
export class TodoKeyresultService {
  constructor(
    @InjectRepository(Todo_keyresultEntity)
    private readonly keyresultRepository: Repository<Todo_keyresultEntity>,
  ) {}

  async create(
    post: Partial<CreateTodoKeyresultDto>,
  ): Promise<Todo_keyresultEntity> {
    if (!post.todoId || !post.keyresultId) {
      throw new HttpException('缺少内容', HttpStatus.BAD_REQUEST);
    }
    return await this.keyresultRepository.save(post);
  }

  async findAll() {
    return this.keyresultRepository.find();
  }

  async select(post: Partial<CreateTodoKeyresultDto>) {
    if (post.keyresultId) {
      const keyresultId = post.keyresultId;
      return await this.keyresultRepository.find({ where: { keyresultId } });
    }
    if (post.todoId) {
      const todoId = post.todoId;
      return await this.keyresultRepository.find({ where: { todoId } });
    }
  }

  async remove(post: Partial<CreateTodoKeyresultDto>) {
    let existPost = null;
    if (post.keyresultId) {
      const keyresultId = post.keyresultId;
      existPost = await this.keyresultRepository.find({
        where: { keyresultId },
      });
    }
    if (post.todoId) {
      const todoId = post.todoId;
      existPost = await this.keyresultRepository.find({ where: { todoId } });
    }
    if (!existPost) {
      throw new HttpException(`没有匹配到目标`, HttpStatus.BAD_REQUEST);
    }
    return await this.keyresultRepository.remove(existPost);
  }
}
