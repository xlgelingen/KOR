import { Module } from '@nestjs/common';
import { KeyresultService } from './keyresult.service';
import { KeyresultController } from './keyresult.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeyresultsEntity } from './entities/keyresult.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KeyresultsEntity])],
  controllers: [KeyresultController],
  providers: [KeyresultService],
  exports: [KeyresultService],
})
export class KeyresultModule {}
