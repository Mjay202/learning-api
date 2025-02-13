import { Controller, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { CompletionService } from './completions.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';


@Controller('completion')
@UseGuards(JwtAuthGuard)
export class CompletionController {
  constructor(private readonly completionService: CompletionService) {}

  @Post()
  markTopicComplete(@Request() req, @Param() topicId: string ) {
    return this.completionService.markTopicCompleteById(req.user.id, topicId);
  }
}
