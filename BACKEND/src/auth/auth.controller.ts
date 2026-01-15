// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, Get, Req, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '.././common/decorators/pulbic.decorator';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @Public()
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);

    res.cookie("access_token", result.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/"
    });

    return {
      user: result.user,
    };
  }

  @Post('logout')
  @Public()
  async logout(
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/"
    });

    return {
      message: 'logout successful'
    };
  }

  @Get('me')
  async me(@Req() req: Request) {

    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedException('No token');
    }
    try {
      const result = await this.authService.verify(token);
      return (result);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }



}
