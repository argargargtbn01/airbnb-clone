import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/users.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
  async login(user: UserDocument) {
    return user;
  }
  async authenticate(user: any): Promise<any> {
    try {
      return user;
    } catch (error) {
      throw error;
    }
  }
}
