import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UserLoginCredentials } from 'src/types/user.type';
import { UsersService } from 'src/users/users.service';
import { UserLoginDto } from './dto/user-login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { mapUserDataToResponse } from 'src/utils/map-user-data-to-response';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    ) { }
    
    private async validateUser(email: string, password: string): Promise<UserLoginCredentials | null> {
        // Get user Login Credentials
        const user = await this.usersService.getLoginCredentials(email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await argon2.verify(
          user.password, password.trim(),
        );
       if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
       
        return user;
    }

    async register(userDto: CreateUserDto) {
      // Checking if email already exists
      const existingUser = await this.usersService.checkIfUserExists(userDto.email);
      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }

      // Create new user
        const user = await this.usersService.create({
          name: userDto.name,
          email: userDto.email,
          password: userDto.password,
        });

      // Return user details without password
      return mapUserDataToResponse(user);
    }

    async login(dto: UserLoginDto) {

        // Checking user validation
        const user = await this.validateUser(dto.email, dto.password);
        if (!user) throw new UnauthorizedException('Invalid credentials');
       
        const payload = { sub: user.id, email: user.email, user_type: user.user_type }
        return {
            id: user.id,
            email: user.email,
            user_type: user.user_type,
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
