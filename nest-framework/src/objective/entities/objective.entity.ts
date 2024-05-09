import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('objectives')
export class ObjectivesEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column()
  content: string;

  @Column()
  isCompleted: boolean;

  //创建时间列，默认值为当前时间戳
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_time: Date;
}
