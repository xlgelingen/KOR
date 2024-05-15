import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateKeyresultDto } from './dto/create-keyresult.dto';
import { UpdateKeyresultDto } from './dto/update-keyresult.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyresultsEntity } from './entities/keyresult.entity';
import * as moment from 'moment';

@Injectable()
export class KeyresultService {
  constructor(
    @InjectRepository(KeyresultsEntity)
    private readonly keyresultRepository: Repository<KeyresultsEntity>,
  ) {}

  // async create(post: Partial<CreateKeyresultDto>): Promise<KeyresultsEntity> {
  //   if (!post.content || !post.objId) {
  //     throw new HttpException('缺少内容', HttpStatus.BAD_REQUEST);
  //   }
  //   return await this.keyresultRepository.save(post);
  // }
  async create(post: Partial<CreateKeyresultDto>): Promise<KeyresultsEntity[]> {
    const objId = post.objId;
    const keyresults = post.keyresults;

    const keyresultInfos: KeyresultsEntity[] = [];

    // 遍历 keyresultIdArr 创建多个 Todo_keyresultEntity 对象
    for (const keyresult of keyresults) {
      const keyresultInfo = new KeyresultsEntity();
      keyresultInfo.objId = objId;
      if (typeof keyresult === 'string') {
        keyresultInfo.content = keyresult;
      }
      if (typeof keyresult === 'object') {
        keyresultInfo.id = keyresult.id;
        keyresultInfo.content = keyresult.content;
      }
      keyresultInfos.push(keyresultInfo);
    }

    // 使用 repository 的 save 方法保存所有 Todo_keyresultEntity 对象
    return await this.keyresultRepository.save(keyresultInfos);
  }

  async findAll() {
    // const datas = await this.keyresultRepository.find();
    // console.log('KR返回全部：', datas);
    const datas = await this.keyresultRepository.find();
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
    // const existPost = await this.keyresultRepository.findOne({ where: { id } });
    // if (!existPost) {
    //   throw new HttpException(`id为${id}的目标不存在`, HttpStatus.NOT_FOUND);
    // }
    // existPost.isCompleted = true;
    // return await this.keyresultRepository.save(existPost);
    const existPost = await this.keyresultRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的目标不存在`, HttpStatus.NOT_FOUND);
    }
    existPost.isCompleted = true;
    existPost.completed_time = new Date();
    return await this.keyresultRepository.save(existPost);
  }

  // async removeById(id: number) {
  //   const existPost = await this.keyresultRepository.findOne({ where: { id } });
  //   if (!existPost) {
  //     throw new HttpException(`id为${id}的目标不存在`, HttpStatus.BAD_REQUEST);
  //   }
  //   return await this.keyresultRepository.remove(existPost);
  // }

  async remove(post: Partial<CreateKeyresultDto>) {
    let existPost = null;
    if (post.id) {
      const id = post.id;
      existPost = await this.keyresultRepository.find({
        where: { id },
      });
    }
    if (post.objId) {
      const objId = post.objId;
      existPost = await this.keyresultRepository.find({
        where: { objId },
      });
    }
    if (!existPost.length) {
      throw new HttpException(`没有匹配到目标`, HttpStatus.BAD_REQUEST);
    }
    return await this.keyresultRepository.remove(existPost);
  }
}
