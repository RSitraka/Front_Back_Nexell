// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from '../../user/enums/user-role.enum';
import { Request } from 'express';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.access_token,
      ]),
      ignoreExpiration: false,
       secretOrKey: process.env.JWT_SECRET || 'ton-secret-super-secret-2025'
    });
  }

  // CETTE MÉTHODE DOIT RETOURNER LE RÔLE
  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role as UserRole, // ← OBLIGATOIRE POUR RolesGuard
    };
  }
}
