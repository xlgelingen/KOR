import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectivesEntity } from './entities/objective.entity';

@Injectable()
export class ObjectiveService {
  constructor(
    @InjectRepository(ObjectivesEntity)
    private readonly objectiveRepository: Repository<ObjectivesEntity>,
  ) {}

  async create(
    objective: Partial<CreateObjectiveDto>,
  ): Promise<ObjectivesEntity> {
    if (!objective.content) {
      throw new HttpException('缺少目标内容', HttpStatus.BAD_REQUEST);
    }
    return await this.objectiveRepository.save(objective);
  }

  async findAll() {
    return this.objectiveRepository.find();
  }

  async findById(id: number) {
    return await this.objectiveRepository.findOne({ where: { id } });
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

  async remove(id: number) {
    const existPost = await this.objectiveRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的目标不存在`, HttpStatus.BAD_REQUEST);
    }
    return await this.objectiveRepository.remove(existPost);
  }
}
