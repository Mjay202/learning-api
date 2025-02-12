import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async find() {
    return this.userService.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return req.user;
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
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }
}
