import slugify from "slugify";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as argon2 from 'argon2';

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
    default: UserType.STUDENT
  })
  user_type: UserType;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
      if (this.name) {
            this.slug = slugify(this.name, { lower: true, strict: true });
      }
    }
    
    // @BeforeInsert()
    // async hashPassword() {
    //    if (!this.password) {
    //      throw new Error('Password is required before hashing');
    //    }
    //     this.password = await argon2.hash(this.password);
    // }
}