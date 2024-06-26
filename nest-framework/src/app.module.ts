import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ormConfig } from './config/db.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ObjectiveModule } from './objective/objective.module';
import { KeyresultModule } from './keyresult/keyresult.module';
import { TodoModule } from './todo/todo.module';
import { TodoKeyresultModule } from './todo_keyresult/todo_keyresult.module';

@Module({
  imports: [
    //为了使用环境变量
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...ormConfig,
      synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭,否则会丢失生产数据。
      autoLoadEntities: true, //通过 forFeature() 方法注册的每个实体都将自动添加到配置对象的 entities 数组中。
    }),
    AuthModule,
    UserModule,
    ObjectiveModule,
    KeyresultModule,
    TodoModule,
    TodoKeyresultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
