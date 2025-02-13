import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserType } from './user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  @IsEnum(UserType)
  user_type?: UserType;
}
