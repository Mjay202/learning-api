import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { SlugService } from 'src/common/providers/slug.servcie';
import { CompletionService } from 'src/completions/completions.service';
import { CreateSubjectDto } from './subjects.dto';
import { Topic } from 'src/topics/topics.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
    @InjectRepository(Topic) private readonly topicRepo: Repository<Topic>,
    private readonly slugService: SlugService,
    private readonly completionService: CompletionService,
  ) {}

  async create(dto: CreateSubjectDto): Promise<Subject> {
    const slug = await this.slugService.generateUniqueSlug(
      dto.title,
      this.subjectRepo,
    );

    // Create and save the subject first
    let subject = this.subjectRepo.create({
      slug,
      title: dto.title,
    });
    subject = await this.subjectRepo.save(subject);

    // Save topics separately with the correct subjectSlug and subject reference
    if (dto.topics && dto.topics.length > 0) {
      const topics = await Promise.all(
        dto.topics.map(async (topic) =>
          this.topicRepo.create({
            ...topic,
            slug: await this.slugService.generateUniqueSlug(
              topic.title,
              this.topicRepo,
            ),
            subject, 
          }),
        ),
      );
      await this.topicRepo.save(topics);
    }

    return subject;
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

  async findOneWithRankingsById(id: string) {
    const subject = await this.subjectRepo.findOne({
      where: { id },
      relations: ['topics'],
    });
    if (!subject) throw new NotFoundException('Subject not found');
    const rankings = await this.completionService.getSubjectRankings(
      subject.id,
    );
    return { subject, rankings };
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
    if (title) {
      subject.title = title;
      subject.slug = await this.slugService.generateUniqueSlug(
        title,
        this.subjectRepo,
      );
    }
    return this.subjectRepo.save(subject);
  }

  async updateById(id: string, title: string): Promise<Subject> {
    const subject = await this.findOneById(id);

    if (title) {
      subject.title = title;
      subject.slug = await this.slugService.generateUniqueSlug(
        title,
        this.subjectRepo,
      );
    }

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
