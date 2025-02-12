import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([Subject]),
    CommonModule],
  controllers: [SubjectsController],
  providers: [SubjectsService, ]
})
export class SubjectsModule {}
