import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { SlugService } from 'src/common/providers/slug.servcie';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
    private readonly slugService: SlugService,
  ) {}

  async create(title: string): Promise<Subject> {
    const slug = await this.slugService.generateUniqueSlug(
      title,
      this.subjectRepo,
    );
    const newSubject = this.subjectRepo.create({ title, slug });
    return this.subjectRepo.save(newSubject);
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectRepo.find({ relations: ['topics'] });
  }

  async findOneById(id: string): Promise<Subject> {
    const subject = await this.subjectRepo.findOne({
      where: { id },
      relations: ['topics'],
    });
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
    }
    
  async findOneBySlug(slug: string): Promise<Subject> {
    const subject = await this.subjectRepo.findOne({
      where: { slug },
      relations: ['topics'],
    });
    if (!subject) throw new NotFoundException('Subject not found');
    return subject;
  }

  async updateBySlug(slug: string, title: string): Promise<Subject> {
    const subject = await this.findOneBySlug(slug);
    subject.title = title;
    subject.slug = await this.slugService.generateUniqueSlug(
      title,
      this.subjectRepo,
    );
    return this.subjectRepo.save(subject);
    }
    
  async updateById(id: string, title: string): Promise<Subject> {
    const subject = await this.findOneById(id);
    subject.title = title;
    subject.slug = await this.slugService.generateUniqueSlug(
      title,
      this.subjectRepo,
    );
    return this.subjectRepo.save(subject);
  }

  async removeById(id: string): Promise<void> {
    const subject = await this.findOneById(id);
     await this.subjectRepo.remove(subject);
    }
    
  async removeBySlug(slug: string): Promise<void> {
    const subject = await this.findOneBySlug(slug);
     await this.subjectRepo.remove(subject);
  }
}
