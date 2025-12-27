import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

export interface AuthenticatedRequest extends Request {
  user: { id: number };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user.id);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Req() req: AuthenticatedRequest) {
    return this.authService.refreshToken(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  signOut(@Req() req: AuthenticatedRequest) {
    return this.authService.signOut(req.user.id);
  }
}
