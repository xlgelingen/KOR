import { Module } from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { ObjectiveController } from './objective.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectivesEntity } from './entities/objective.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectivesEntity])],
  controllers: [ObjectiveController],
  providers: [ObjectiveService],
  exports: [ObjectiveService],
})
export class ObjectiveModule {}
