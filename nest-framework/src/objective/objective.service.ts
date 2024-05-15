import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectivesEntity } from './entities/objective.entity';
import * as moment from 'moment';

@Injectable()
export class ObjectiveService {
  constructor(
    @InjectRepository(ObjectivesEntity)
    private readonly objectiveRepository: Repository<ObjectivesEntity>,
  ) {}

  async create(post: Partial<CreateObjectiveDto>): Promise<ObjectivesEntity> {
    if (!post.content) {
      throw new HttpException('缺少目标内容', HttpStatus.BAD_REQUEST);
    }
    return await this.objectiveRepository.save(post);
  }

  async findAll() {
    const datas = await this.objectiveRepository.find();
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
    const data = await this.objectiveRepository.findOne({ where: { id } });
    const create_time = moment(data.create_time).format('YYYY/MM/DD HH:mm');
    let completed_time = '';
    if (data.completed_time) {
      completed_time = moment(data.completed_time).format('YYYY/MM/DD HH:mm');
    }
    const dataInfo = { ...data, create_time, completed_time };

    return dataInfo;
  }

  async update(id: number, updateObjective: Partial<UpdateObjectiveDto>) {
    const existPost = await this.objectiveRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的目标不存在`, HttpStatus.NOT_FOUND);
    }
    const updatePost = this.objectiveRepository.merge(
      existPost,
      updateObjective,
    );
    return this.objectiveRepository.save(updatePost);
  }

  async setCompleted(id: number) {
    // const existPost = await this.objectiveRepository.findOne({ where: { id } });
    // if (!existPost) {
    //   throw new HttpException(`id为${id}的目标不存在`, HttpStatus.NOT_FOUND);
    // }
    // existPost.isCompleted = true;
    // return await this.objectiveRepository.save(existPost);
    const existPost = await this.objectiveRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的目标不存在`, HttpStatus.NOT_FOUND);
    }
    existPost.isCompleted = true;
    existPost.completed_time = new Date();
    return await this.objectiveRepository.save(existPost);
  }

  async remove(id: number) {
    const existPost = await this.objectiveRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的目标不存在`, HttpStatus.BAD_REQUEST);
    }
    return await this.objectiveRepository.remove(existPost);
  }
}
