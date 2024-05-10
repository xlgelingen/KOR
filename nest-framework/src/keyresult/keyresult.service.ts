import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateKeyresultDto } from './dto/create-keyresult.dto';
import { UpdateKeyresultDto } from './dto/update-keyresult.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyresultsEntity } from './entities/keyresult.entity';

@Injectable()
export class KeyresultService {
  constructor(
    @InjectRepository(KeyresultsEntity)
    private readonly keyresultRepository: Repository<KeyresultsEntity>,
  ) {}

  async create(post: Partial<CreateKeyresultDto>): Promise<KeyresultsEntity> {
    if (!post.content || !post.objId) {
      throw new HttpException('缺少内容', HttpStatus.BAD_REQUEST);
    }
    return await this.keyresultRepository.save(post);
  }

  async findAll() {
    return this.keyresultRepository.find();
  }

  async findById(id: number) {
    return await this.keyresultRepository.findOne({ where: { id } });
  }

  async findByObjId(objId: number) {
    return await this.keyresultRepository.find({ where: { objId } });
  }

  async update(id: number, updateObjective: Partial<UpdateKeyresultDto>) {
    const existPost = await this.keyresultRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的目标不存在`, HttpStatus.NOT_FOUND);
    }
    const updatePost = this.keyresultRepository.merge(
      existPost,
      updateObjective,
    );
    return this.keyresultRepository.save(updatePost);
  }

  async setCompleted(id: number) {
    const existPost = await this.keyresultRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的目标不存在`, HttpStatus.NOT_FOUND);
    }
    existPost.isCompleted = true;
    return await this.keyresultRepository.save(existPost);
  }

  async remove(id: number) {
    const existPost = await this.keyresultRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的目标不存在`, HttpStatus.BAD_REQUEST);
    }
    return await this.keyresultRepository.remove(existPost);
  }
}
