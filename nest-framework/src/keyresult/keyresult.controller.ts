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

  @Post()
  create(@Body() createKeyresultDto: CreateKeyresultDto) {
    return this.keyresultService.create(createKeyresultDto);
  }

  @Get()
  findAll() {
    return this.keyresultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keyresultService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKeyresultDto: UpdateKeyresultDto,
  ) {
    return this.keyresultService.update(+id, updateKeyresultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keyresultService.remove(+id);
  }
}
