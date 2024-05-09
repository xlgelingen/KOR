import { Injectable } from '@nestjs/common';
import { CreateKeyresultDto } from './dto/create-keyresult.dto';
import { UpdateKeyresultDto } from './dto/update-keyresult.dto';

@Injectable()
export class KeyresultService {
  create(createKeyresultDto: CreateKeyresultDto) {
    return 'This action adds a new keyresult';
  }

  findAll() {
    return `This action returns all keyresult`;
  }

  findOne(id: number) {
    return `This action returns a #${id} keyresult`;
  }

  update(id: number, updateKeyresultDto: UpdateKeyresultDto) {
    return `This action updates a #${id} keyresult`;
  }

  remove(id: number) {
    return `This action removes a #${id} keyresult`;
  }
}
