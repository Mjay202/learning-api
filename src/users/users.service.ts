import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[] | null> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id} });
    }
    
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
    }
    
  async findBySlug(slug: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { slug } });
    }
    
}
