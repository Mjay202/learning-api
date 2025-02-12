import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  create(@Body('title') title: string) {
    return this.subjectsService.create(title);
  }

  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOneById(id);
  }

  @Get('by-slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.subjectsService.findOneBySlug(slug);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('title') title: string) {
    return this.subjectsService.updateById(id, title);
  }

  @Put('by-slug/:slug')
  updateBySlug(@Param('slug') slug: string, @Body('title') title: string) {
    return this.subjectsService.updateBySlug(slug, title);
  }

  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.subjectsService.removeById(id);
  }

  @Delete('by-slug/:id')
  removeBySlug(@Param('id') id: string) {
    return this.subjectsService.removeById(id);
  }
}
