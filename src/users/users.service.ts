import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { mapUserDataToResponse } from 'src/utils/map-user-data-to-response';
import { UserLoginCredentials, UserRecord } from 'src/types/user.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto) {
    const user = this.userRepository.create(userData);
    user.password = await argon2.hash(user.password);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[] | null> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<UserRecord | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return mapUserDataToResponse(user);
  }

  async findByEmail(email: string): Promise<UserRecord | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return mapUserDataToResponse(user);
  }

  async findBySlug(slug: string): Promise<UserRecord | null> {
    const user = await this.userRepository.findOne({ where: { slug } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return mapUserDataToResponse(user);
  }

  async getLoginCredentials(
    email: string,
  ): Promise<UserLoginCredentials | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      user_type: user.user_type,
    };
  }

  async checkIfUserExists(email: string): Promise<boolean | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user ? true : false;
  }
}
