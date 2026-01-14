// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user)
      throw new UnauthorizedException('Email ou mot de passe incorrect');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch)
      throw new UnauthorizedException('Email ou mot de passe incorrect');

    const payload = { sub: user.id, email: user.email, role: user.role, roleId: user.employe?.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, role: user.role, roleId: user.employe?.id },
    };
  }
}
