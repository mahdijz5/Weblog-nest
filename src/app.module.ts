import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PaymentModule } from './payment/payment.module';
import config from './configs/typeorm';


@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    PostModule,
    AuthModule,
    UserModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
