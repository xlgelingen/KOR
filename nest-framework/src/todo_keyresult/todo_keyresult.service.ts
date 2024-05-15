import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTodoKeyresultDto } from './dto/create-todo_keyresult.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo_keyresultEntity } from './entities/todo_keyresult.entity';

@Injectable()
export class TodoKeyresultService {
  constructor(
    @InjectRepository(Todo_keyresultEntity)
    private readonly todoKeyresultRepository: Repository<Todo_keyresultEntity>,
  ) {}

  // async create(
  //   post: Partial<CreateTodoKeyresultDto>,
  // ): Promise<Todo_keyresultEntity> {
  //   if (!post.todoId || !post.keyresultId) {
  //     throw new HttpException('缺少内容', HttpStatus.BAD_REQUEST);
  //   }
  //   return await this.todoKeyresultRepository.save(post);
  // }

  async createByArr(
    post: Partial<CreateTodoKeyresultDto>,
  ): Promise<Todo_keyresultEntity[]> {
    const todoId = post.todoId;
    const keyresultIdArr = post.keyresultIdArr;

    const todoKeyresults: Todo_keyresultEntity[] = [];

    // 遍历 keyresultIdArr 创建多个 Todo_keyresultEntity 对象
    for (const keyresultId of keyresultIdArr) {
      const todoKeyresult = new Todo_keyresultEntity();
      todoKeyresult.keyresultId = keyresultId;
      todoKeyresult.todoId = todoId;

      todoKeyresults.push(todoKeyresult);
    }

    // 使用 repository 的 save 方法保存所有 Todo_keyresultEntity 对象
    return await this.todoKeyresultRepository.save(todoKeyresults);
  }

  async findAll() {
    return this.todoKeyresultRepository.find();
  }

  async select(post: Partial<CreateTodoKeyresultDto>) {
    if (post.keyresultId) {
      const keyresultId = post.keyresultId;
      return await this.todoKeyresultRepository.find({
        where: { keyresultId },
      });
    }
    if (post.todoId) {
      const todoId = post.todoId;
      return await this.todoKeyresultRepository.find({ where: { todoId } });
    }
  }

  async remove(post: Partial<CreateTodoKeyresultDto>) {
    let existPost = null;
    if (post.keyresultId) {
      const keyresultId = post.keyresultId;
      existPost = await this.todoKeyresultRepository.find({
        where: { keyresultId },
      });
    }
    if (post.todoId) {
      const todoId = post.todoId;
      existPost = await this.todoKeyresultRepository.find({
        where: { todoId },
      });
    }
    if (!existPost.length) {
      throw new HttpException(`没有匹配到目标`, HttpStatus.BAD_REQUEST);
    }
    return await this.todoKeyresultRepository.remove(existPost);
  }
}
