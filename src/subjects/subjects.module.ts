import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { CompletionsModule } from 'src/completions/completions.module';
import { Topic } from 'src/topics/topics.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([Subject, Topic]),
    CompletionsModule,
    CommonModule,],
  controllers: [SubjectsController],
  providers: [SubjectsService, ]
})
export class SubjectsModule {}
