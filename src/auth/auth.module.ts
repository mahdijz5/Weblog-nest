import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import entities from 'src/entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from "./strategies/local.strategy"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtGuard } from './guards/jwt.guard';
 
@Module({
  imports: [TypeOrmModule.forFeature(entities), PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: "1d"
    }
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtGuard],
  controllers: [AuthController],
  exports: [JwtStrategy,JwtGuard]
})
export class AuthModule {}
