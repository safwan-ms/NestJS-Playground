import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        select: { id: true, username: true, email: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Failed to fetch users',
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: { id: true, username: true, email: true },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      // Prisma may throw errors other than not found
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Failed to fetch user',
      );
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: { id: true, username: true, email: true },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      const deletedUser = await this.prisma.user.delete({
        where: { id },
        select: { id: true, username: true, email: true },
      });
      return deletedUser;
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Failed to delete user',
      );
    }
  }
}
