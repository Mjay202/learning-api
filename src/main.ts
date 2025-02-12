import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { GlobalExceptionFilters } from './common/filters/http-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enabling global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true, 
    }),
  );

  // Using Global Interceptors to model a unique response format
  app.useGlobalInterceptors(new ResponseInterceptor);

  // Using Global Exceptions to model a unique error format too
  app.useGlobalFilters(new GlobalExceptionFilters);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
