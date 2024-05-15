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
  // @Post()
  // create(@Body() createTodoKeyresultDto: CreateTodoKeyresultDto) {
  //   return this.todoKeyresultService.create(createTodoKeyresultDto);
  // }

  @Post('select')
  slecet(@Body() post) {
    const objId = post.objId;
    return this.keyresultService.findByObjId(+objId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.keyresultService.findById(+id);
  }

  @Get('objId/:id')
  findByObjId(@Param('id') id: string) {
    return this.keyresultService.findByObjId(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKeyresultDto: Partial<UpdateKeyresultDto>,
  ) {
    return this.keyresultService.update(+id, updateKeyresultDto);
  }

  @Patch('complete/:id')
  setCompleted(@Param('id') id: string) {
    return this.keyresultService.setCompleted(+id);
  }

  // @Delete(':id')
  // removeById(@Param('id') id: string) {
  //   return this.keyresultService.remove(+id);
  // }

  @Delete()
  remove(@Body() post: CreateKeyresultDto) {
    return this.keyresultService.remove(post);
  }
}
