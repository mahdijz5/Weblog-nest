import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001']
  })
  
  //? Swagger setup
  const config = new DocumentBuilder().setTitle("Authentication API").setDescription("Authentication API including forget password feature").setVersion("1.0").addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)
  
  
  await app.listen(3000);
}
bootstrap();
