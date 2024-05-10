import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KeyresultService } from './keyresult.service';
import { CreateKeyresultDto } from './dto/create-keyresult.dto';
import { UpdateKeyresultDto } from './dto/update-keyresult.dto';

@Controller('keyresult')
export class KeyresultController {
  constructor(private readonly keyresultService: KeyresultService) {}

  @Get()
  findAll() {
    return this.keyresultService.findAll();
  }

  @Post()
  create(@Body() createKeyresultDto: Partial<CreateKeyresultDto>) {
    return this.keyresultService.create(createKeyresultDto);
  }

  @Post('select')
  slecet(@Body() post) {
    const objId = post.objId;
    return this.keyresultService.findByObjId(+objId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keyresultService.findById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKeyresultDto: Partial<UpdateKeyresultDto>,
  ) {
    return this.keyresultService.update(+id, updateKeyresultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keyresultService.remove(+id);
  }
}
