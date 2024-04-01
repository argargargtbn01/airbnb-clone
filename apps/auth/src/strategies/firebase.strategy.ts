import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import * as firebaseAdmin from 'firebase-admin';
import { HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase-auth') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(token: string) {
    const firebaseAuth = firebaseAdmin.auth();
    let userClaims;
    try {
      userClaims = await firebaseAuth.verifyIdToken(token);
    } catch (err) {
      throw new HttpException('Firebase ID token has expired', HttpStatus.BAD_REQUEST);
    }

    if (!userClaims) {
      throw new UnauthorizedException();
    }
    const { uid, email } = userClaims;
    const user = { uid, email };
    return user;
  }
}
