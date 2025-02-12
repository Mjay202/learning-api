import { Subject } from 'src/subjects/subject.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


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

  @ManyToOne(() => Subject, (subject) => subject.topics, {
    onDelete: 'CASCADE',
  })
  subject: Subject;
}
