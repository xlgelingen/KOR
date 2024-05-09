import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo_keyresult')
export class Todo_keyresultEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column()
  todoId: number;

  @Column()
  keyresultId: number;

  //创建时间列，默认值为当前时间戳
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;
}
