import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateSubjectDto } from './subjects.dto';

@Controller('subjects')
@UseGuards(JwtAuthGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  create(@Body() dto: CreateSubjectDto) {
    return this.subjectsService.create(dto);
  }

  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
      if (req.user.user_type !== 'Admin' && req.user.user_type !== 'Teacher') {
      return this.subjectsService.findOneById(id);
    }
    return this.subjectsService.findOneWithRankingsById(id);
  }

  @Get('by-slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.subjectsService.findOneBySlug(slug);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body('title') title: string) {
    return this.subjectsService.updateById(id, title);
  }

  @Patch('by-slug/:slug')
  updateBySlug(@Param('slug') slug: string, @Body('title') title: string) {
    return this.subjectsService.updateBySlug(slug, title);
  }

  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.subjectsService.removeById(id);
  }

  @Delete('by-slug/:id')
  removeBySlug(@Param('id') id: string) {
    return this.subjectsService.removeBySlug(id);
  }
}
