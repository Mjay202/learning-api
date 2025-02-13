import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTopicDto } from 'src/topics/topics.dto';

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTopicDto)
  topics: CreateTopicDto[];
}
