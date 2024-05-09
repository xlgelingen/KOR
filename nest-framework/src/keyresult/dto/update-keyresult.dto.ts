import { PartialType } from '@nestjs/mapped-types';
import { CreateKeyresultDto } from './create-keyresult.dto';

export class UpdateKeyresultDto extends PartialType(CreateKeyresultDto) {}
