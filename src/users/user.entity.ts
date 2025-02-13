import slugify from "slugify";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Completion } from "src/completions/completions.entity";

export enum UserType {
  ADMIN = 'Admin',
  TEACHER = 'Teacher',
  STUDENT = 'Student',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.STUDENT,
  })
  user_type: UserType;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date | null;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date | null;

  @OneToMany(() => Completion, (completion) => completion.user)
  completions: Completion;
}