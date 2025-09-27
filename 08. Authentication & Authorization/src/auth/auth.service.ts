import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password, role } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException(
        'User already exists! Please try a different email.',
      );
    }

    try {
      // Hash the password
      const hashedPassword: string = await bcrypt.hash(password, 10);

      // Create new user
      const newlyCreatedUser = await this.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: role ?? 'user',
        },
      });

      // Remove password from returned object
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = newlyCreatedUser;

      return result;
    } catch (error: unknown) {
      // Handle unexpected errors safely
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Something went wrong',
      );
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwtService.signAsync({
      userId: user.id,
      role: user.role,
    });

    // Remove password from returned object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;

    return { ...result, token };
  }
}
