import slugify from "slugify";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}