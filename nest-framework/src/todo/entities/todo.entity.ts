import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
export class TodosEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column()
  content: string;

  @Column({ default: () => false })
  isCompleted: boolean;

  //创建时间列，默认值为当前时间戳
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_time: Date;
}
