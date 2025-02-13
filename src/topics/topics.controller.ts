import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { Topic } from './topics.entity';
import { CreateTopicDto, UpdateTopicDto } from './topics.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CompletionService } from 'src/completions/completions.service';

@Controller('topics')
@UseGuards(JwtAuthGuard)
export class TopicsController {
    constructor(
        private readonly topicService: TopicsService,
        private readonly completionService: CompletionService
  ) { }
  
  @Get()
  async findAll() {
    return this.topicService.findAll()
}

  @Post()
  async create(
    @Body()
    topicDto: CreateTopicDto,
  ): Promise<Topic> {
    return this.topicService.create(topicDto);
  }

  @Post('completed-by-id/:id')
  async markTopicCompleteById(@Request() req, @Param('id') topicId: string) {
    return this.completionService.markTopicCompleteById(req.user.id, topicId);
    }
    
  @Post('completed-by-slug/:id')
  async markTopicCompleteBySlug(@Request() req, @Param('slug') slug: string) {
    return this.completionService.markTopicCompleteBySlug(req.user.id, slug);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Topic> {
    return this.topicService.findById(id);
  }

  @Get('by-slug/:slug')
  async findBySlug(@Param('slug') slug: string): Promise<Topic> {
    return this.topicService.findBySlug(slug);
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body()
    topicDto: UpdateTopicDto,
  ): Promise<Topic> {
    return this.topicService.updateBySlug(id, topicDto);
  }

  @Patch('by-slug/:slug')
  async updateBySlug(
    @Param('slug') slug: string,
    @Body()
    topicDto: UpdateTopicDto,
  ): Promise<Topic> {
    return this.topicService.updateBySlug(slug, topicDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    return this.topicService.deleteById(id);
  }

  @Delete('by-slug/:slug')
  async deleteBySlug(@Param('slug') slug: string): Promise<void> {
    return this.topicService.deleteBySlug(slug);
  }
}
