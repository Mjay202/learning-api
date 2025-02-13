import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { mapUserDataToResponse } from 'src/utils/map-user-data-to-response';
import { UserLoginCredentials, UserRecord } from 'src/types/user.type';
import { SlugService } from 'src/common/providers/slug.servcie';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly slugService: SlugService,
  ) {}

  async create(userData: CreateUserDto) {
    const slug = await this.slugService.generateUniqueSlug(
      userData.name,
      this.userRepository,
    );
    const user = this.userRepository.create({ ...userData, slug });
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

  async removeById(id: string) {
    await this.userRepository.delete({ id });
  }

  async removeBySlug(slug: string) {
    await this.userRepository.delete({ slug });
  }

  async updateBySlug(slug: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { slug } });
    return this.update(user, dto);
  }

  async updateById(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    return this.update(user, dto);
  }

  async update(user: User | null, dto: UpdateUserDto) {
    if (!user) {
      throw new NotFoundException('User not found');
    }
    let slug = user.slug;
    dto.email = dto.email || user.email;
    dto.user_type = dto.user_type || user.user_type;
    if (dto.password) {
      dto.password = await argon2.hash(user.password);
    } else {
      dto.password = user.password;
    }
    if (dto.name) {
      dto.name = dto.name;
      slug = await this.slugService.generateUniqueSlug(
        dto.name,
        this.userRepository,
      );
    } else {
      dto.name = user.name;
    }

    Object.assign(user, { ...dto, slug });

    const updatedUser = await this.userRepository.save(user); 
    const { password, ...safe } = updatedUser;
    return safe
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
