import { MigrationInterface, QueryRunner } from 'typeorm';
import { UsersEntity } from '../src/user/entities/user.entity';
import { ObjectivesEntity } from '../src/objective/entities/objective.entity';
import { KeyresultsEntity } from '../src/keyresult/entities/keyresult.entity';
import { TodosEntity } from '../src/todo/entities/todo.entity';
import { Todo_keyresultEntity } from '../src/todo_keyresult/entities/todo_keyresult.entity';

export class PostTable1715073215662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(ObjectivesEntity, [
      {
        content: '目标1',
      },
      {
        content: '目标2',
      },
      {
        content: '目标3',
      },
    ]);
    await queryRunner.manager.save(KeyresultsEntity, [
      {
        objId: 1,
        content: 'KR1',
      },
      {
        objId: 1,
        content: 'KR2',
      },
      {
        objId: 2,
        content: 'KR3',
      },
      {
        objId: 2,
        content: 'KR4',
      },
      {
        objId: 3,
        content: 'KR5',
      },
      {
        objId: 3,
        content: 'KR6',
      },
    ]);
    await queryRunner.manager.save(TodosEntity, [
      {
        content: 'todo1',
      },
      {
        content: 'todo2',
      },
      {
        content: 'todo3',
      },
      {
        content: 'todo4',
      },
      {
        content: 'todo5',
      },
      {
        content: 'todo6',
      },
    ]);
    await queryRunner.manager.save(Todo_keyresultEntity, [
      {
        todoId: 1,
        keyresultId: 2,
      },
      {
        todoId: 1,
        keyresultId: 3,
      },
      {
        todoId: 2,
        keyresultId: 4,
      },
      {
        todoId: 2,
        keyresultId: 5,
      },
      {
        todoId: 3,
        keyresultId: 6,
      },
      {
        todoId: 3,
        keyresultId: 1,
      },
      {
        todoId: 4,
        keyresultId: 2,
      },
      {
        todoId: 4,
        keyresultId: 3,
      },
      {
        todoId: 5,
        keyresultId: 4,
      },
      {
        todoId: 5,
        keyresultId: 5,
      },
      {
        todoId: 6,
        keyresultId: 6,
      },
      {
        todoId: 6,
        keyresultId: 1,
      },
    ]);
    await queryRunner.manager.save(UsersEntity, [
      {
        user_name: 'aaa',
        password: 'aaa123456',
      },
      {
        user_name: 'bbb',
        password: 'bbb123456',
      },
      {
        user_name: 'ccc',
        password: 'ccc123456',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(ObjectivesEntity, {});
    await queryRunner.manager.delete(KeyresultsEntity, {});
    await queryRunner.manager.delete(TodosEntity, {});
    await queryRunner.manager.delete(Todo_keyresultEntity, {});
    await queryRunner.manager.delete(UsersEntity, {});
  }
}
