import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoKeyresultDto } from './create-todo_keyresult.dto';

export class UpdateTodoKeyresultDto extends PartialType(CreateTodoKeyresultDto) {}
