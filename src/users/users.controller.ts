import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async find(@Request() req) {
    if (req.user.user_type !== 'Admin' && req.user.user_type !== 'Teacher') {
      throw new ForbiddenException(
        'Only Admins or Teachers are allowed to get all user record',
      );
    }
    return this.userService.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @Get('by-id/:id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('by-slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.userService.findBySlug(slug);
  }

  @Get('by-email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() userData: CreateUserDto) {
    if (req.user.user_type !== 'Admin') {
      throw new ForbiddenException(
        'Only Admin is allowed to create user record',
      );
    }
    return this.userService.create(userData);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateUserById(
    @Request() req,
    @Body() userData: UpdateUserDto,
    @Param('id') id: string,
  ) {
    if (req.user.user_type !== 'Admin') {
      throw new ForbiddenException(
        'Only Admin is allowed to update user record',
      );
    }
    return this.userService.updateById(id, userData);
  }

  @Patch('by-slug/:slug')
  @UseGuards(JwtAuthGuard)
  async updateUserBySlug(
    @Request() req,
    @Body() userData: UpdateUserDto,
    @Param('slug') slug: string,
  ) {
    if (req.user.user_type !== 'Admin') {
      throw new ForbiddenException(
        'Only Admin is allowed to update user record',
      );
    }
    return this.userService.updateBySlug(slug, userData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: string, @Request() req) {
    if (req.user.user_type !== 'Admin') {
      throw new ForbiddenException(
        'Only Admin is allowed to delete user record',
      );
    }
    return this.userService.removeById(id);
  }

  @Delete('by-slug/:slug')
  @UseGuards(JwtAuthGuard)
  async deleteBySlug(@Param('slug') slug: string, @Request() req) {
    if (req.user.user_type !== 'Admin') {
      throw new ForbiddenException(
        'Only Admin is allowed to delete user record',
      );
    }
    return this.userService.removeBySlug(slug);
  }
}
