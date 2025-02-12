import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TopicsModule } from './topics/topics.module';
import { CommonModule } from './common/common.module';
import { CompletionsModule } from './completions/completions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: process.env.APP_ENV !== 'PRODUCTION'
    }),
    UsersModule,
    AuthModule,
    SubjectsModule,
    TopicsModule,
    CommonModule,
    CompletionsModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
