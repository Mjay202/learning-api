import { Module } from '@nestjs/common';
import { CompletionsService } from './completions.service';
import { CompletionsController } from './completions.controller';

@Module({
  providers: [CompletionsService],
  controllers: [CompletionsController]
})
export class CompletionsModule {}
