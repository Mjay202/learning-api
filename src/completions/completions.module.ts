import { Module } from '@nestjs/common';
import { Completion } from './completions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompletionService } from './completions.service';
import { CompletionController } from './completions.controller';
import { Subject } from 'src/subjects/subject.entity';
import { Topic } from 'src/topics/topics.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Completion, Topic, Subject])],
  providers: [CompletionService],
  controllers: [CompletionController],
  exports: [CompletionService]
})
export class CompletionsModule {}
