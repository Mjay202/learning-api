import slugify from 'slugify';
import { Completion } from 'src/completions/completions.entity';
import { Topic } from 'src/topics/topics.entity';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column({ unique: true })
  slug: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date | null;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date | null;

  @OneToMany(() => Topic, (topic) => topic.subject, { cascade: true })
  topics: Topic[];

  @OneToMany(() => Completion, (completion) => completion.subject)
  completions: Completion;
}
