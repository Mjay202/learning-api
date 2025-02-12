import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../subjects/subject.entity';
import { Topic } from './topics.entity';
import { SlugService } from 'src/common/providers/slug.servcie';
import { CreateTopicDto, UpdateTopicDto } from './topics.dto';


@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic) private readonly topicRepo: Repository<Topic>,
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
    private readonly slugService: SlugService,
  ) {}

  async create(topicDto: CreateTopicDto): Promise<Topic> {
    const subject = await this.subjectRepo.findOne({
      where: { slug: topicDto.subjectSlug },
    });
    if (!subject) throw new NotFoundException('Subject not found');

    const slug = await this.slugService.generateUniqueSlug(
      topicDto.title,
      this.topicRepo,
    );
    const newTopic = this.topicRepo.create({ ...topicDto, slug, subject });
    return this.topicRepo.save(newTopic);
  }

  private async update(topic: Topic | null, topicDto: UpdateTopicDto) {
    if (!topic) throw new NotFoundException('Topic not found');

    if (topicDto.subjectSlug) {
      const subject = await this.subjectRepo.findOne({
        where: { slug: topicDto.subjectSlug },
      });
      if (!subject) throw new NotFoundException('Subject not found');
      topic.subject = subject;
    }

    if (topicDto.title) {
      topic.slug = await this.slugService.generateUniqueSlug(
        topicDto.title,
        this.topicRepo,
      );
      topic.title = topicDto.title;
    }
    if (topicDto.description) topic.description = topicDto.description;
    if (topicDto.video) topic.video = topicDto.video;

    return this.topicRepo.save(topic);
  }

  async updateBySlug(slug: string, topicDto: UpdateTopicDto) {
    const topic = await this.topicRepo.findOne({
      where: { slug },
      relations: ['subject'],
    });
      
      return this.update(topic, topicDto)
    }
    
  async updateById(id: string, topicDto: UpdateTopicDto) {
    const topic = await this.topicRepo.findOne({
      where: { id },
      relations: ['subject'],
    });
      
      return this.update(topic, topicDto)
    }
    
  async findById(id: string): Promise<Topic> {
    const topic = await this.topicRepo.findOne({
      where: { id },
      relations: ['subject'],
    });
    if (!topic) throw new NotFoundException('Topic not found');
    return topic;
  }

  async findBySlug(slug: string): Promise<Topic> {
    const topic = await this.topicRepo.findOne({
      where: { slug },
      relations: ['subject'],
    });
    if (!topic) throw new NotFoundException('Topic not found');
    return topic;
  }

  async deleteById(id: string): Promise<void> {
    const result = await this.topicRepo.delete({ id });
    if (result.affected === 0) throw new NotFoundException('Topic not found');
  }

  async deleteBySlug(slug: string): Promise<void> {
    const result = await this.topicRepo.delete({ slug });
    if (result.affected === 0) throw new NotFoundException('Topic not found');
  }
}
