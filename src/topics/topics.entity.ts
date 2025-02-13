import { Completion } from 'src/completions/completions.entity';
import { Subject } from 'src/subjects/subject.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';


@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  video: string;

  @Column('text')
  description: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date | null;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date | null;

  @ManyToOne(() => Subject, (subject) => subject.topics, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @OneToMany(() => Completion, (completion) => completion.topic)
  completions: Completion;
}
