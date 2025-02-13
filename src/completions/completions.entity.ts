import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/users/user.entity';
import { Topic } from 'src/topics/topics.entity';
import { Subject } from 'src/subjects/subject.entity';

@Entity()
@Unique(['user', 'topic']) // Prevents duplicate completion for the same topic
export class Completion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.completions, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Topic, (topic) => topic.completions, {
    onDelete: 'CASCADE',
  })
  topic: Topic;

  @ManyToOne(() => Subject, (subject) => subject.completions, {
    onDelete: 'CASCADE',
  })
  subject: Subject;

  @Column({ default: false })
  is_subject_completed: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  completed_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
