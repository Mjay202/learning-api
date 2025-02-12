import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugService {
  constructor() {}

  async generateUniqueSlug(
    title: string,
    repo: Repository<any>,
  ): Promise<string> {
    let slug = slugify(title, { lower: true, strict: true });
    let existing = await repo.findOne({ where: { slug } });

    let counter = 1;
    while (existing) {
      const newSlug = `${slug}-${counter}`;
      existing = await repo.findOne({ where: { slug: newSlug } });
      if (!existing) return newSlug;
      counter++;
    }

    return slug;
  }
}
