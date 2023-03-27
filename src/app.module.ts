import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import entities from './entities';

@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SERVER_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: entities,
      synchronize: true,
      migrations: [
          'dist/src/db/*.js'
      ],
    }),
    PostModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
