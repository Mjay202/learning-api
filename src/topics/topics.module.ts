import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { CommonModule } from 'src/common/common.module';
import { Topic } from './topics.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/subjects/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Subject]),
    CommonModule],
  controllers: [TopicsController],
  providers: [TopicsService]
})
export class TopicsModule {}
