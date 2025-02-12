import slugify from 'slugify';
import { Topic } from 'src/topics/topics.entity';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => Topic, (topic) => topic.subject)
  topics: Topic[];
}
