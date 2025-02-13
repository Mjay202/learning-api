import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Completion } from './completions.entity';
import { Topic } from 'src/topics/topics.entity';
import { Subject } from 'src/subjects/subject.entity';

@Injectable()
export class CompletionService {
  constructor(
    @InjectRepository(Completion)
    private completionRepo: Repository<Completion>,
    @InjectRepository(Topic)
    private topicRepo: Repository<Topic>,
    @InjectRepository(Subject)
    private subjectRepo: Repository<Subject>,
  ) {}

  async markTopicCompleteById(userId: string, topicId: string) {
    const topic = await this.topicRepo.findOne({
      where: { id: topicId },
      relations: ['subject'],
    });
    return this.markTopicComplete(userId, topic);
  }

  async markTopicCompleteBySlug(userId: string, slug: string) {
    const topic = await this.topicRepo.findOne({
      where: { slug },
      relations: ['subject'],
    });
    return this.markTopicComplete(userId, topic);
  }

  async markTopicComplete(userId: string, topic: Topic | null) {
    if (!topic) throw new NotFoundException('Topic not found');

    const subject = topic.subject;

    const existingCompletion = await this.completionRepo.findOne({
      where: { user: { id: userId }, topic: { id: topic.id } },
    });

    if (existingCompletion) return { message: 'Already marked as completed' };

    await this.completionRepo.save({
      user: { id: userId },
      topic: { id: topic.id },
      subject: { id: subject.id },
    });

    // Check if all topics in the subject are completed
    const allTopics = await this.topicRepo.count({
      where: { subject: { id: subject.id } },
    });
    const completedTopics = await this.completionRepo.count({
      where: { user: { id: userId }, subject: { id: subject.id } },
    });

    if (completedTopics === allTopics) {
      await this.completionRepo.update(
        { user: { id: userId }, subject: { id: subject.id } },
        { is_subject_completed: true },
      );
      return {
        message: 'Topic marked as completed. You have completed this Subject.',
      };
    }

    return { message: 'Topic marked as completed' };
  }

  async getSubjectRankings(subjectId: string) {

  return await this.completionRepo
    .createQueryBuilder('completion')
    .select('user.id', 'user_id')
    .addSelect('user.slug', 'user_slug')
    .addSelect('user.email', 'user_email')
    .addSelect('COUNT(completion.id)', 'topics_completed')
    .addSelect(
      '(COUNT(completion.id) * 100 / (SELECT COUNT(*) from topic WHERE subject_id = :subjectId))',
      'completion_percentage',
    )
    .innerJoin('completion.user', 'user')
    .where('completion.subject = :subjectId', { subjectId })
    .groupBy('user.id')
    .orderBy('topics_completed', 'DESC')
    .getRawMany();
    
  
  }
}
