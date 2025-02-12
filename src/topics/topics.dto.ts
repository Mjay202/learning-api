import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subjectSlug: string;

  @IsString()
  description: string;

  @IsUrl()
  video: string;
}

export class UpdateTopicDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  subjectSlug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  video?: string;
}