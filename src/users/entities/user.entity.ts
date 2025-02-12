import slugify from "slugify";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {hash} from 'bcrypt'

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

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
      if (this.name) {
            this.slug = slugify(this.name, { lower: true, strict: true });
      }
    }
    
    @BeforeInsert()
    async hashPassword() {
       if (!this.password) {
         throw new Error('Password is required before hashing');
       }
        this.password = await hash(this.password, 10);
    }
}