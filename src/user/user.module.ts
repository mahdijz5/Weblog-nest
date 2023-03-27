import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import entities from 'src/entities';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature(entities), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: "1d"
    }
  }), AuthModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
