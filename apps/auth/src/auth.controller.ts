import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDocument } from './users/models/users.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CurrentUser } from '@app/common';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get('authenticate')
  async authen(@CurrentUser() user: UserDocument) {
    return await this.authService.authenticate(user); 
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(FirebaseAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data){
    return data.user
  }
}
