import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService
    ){}

    @Get()
    async find() {
        return this.userService.findAll()
    }

    @Post()
    async create(@Body() userData: CreateUserDto) {
        return this.userService.create(userData);
    }
}
