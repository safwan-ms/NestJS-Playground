import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

type RoleEnum = 'INTERN' | 'ENGINEER' | 'ADMIN';

type UserType = {
  id: number;
  name: string;
  email: string;
  role: RoleEnum;
};

type CreateUser = Omit<UserType, 'id'>;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // GET /users
  @Get()
  findAll(@Query('role') role?: RoleEnum) {
    return this.usersService.findAll(role);
  }

  // GET /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // POST /users
  @Post()
  create(@Body() user: UserType) {
    return this.usersService.create(user);
  }

  // PATCH /users/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() userUpdate: CreateUser) {
    return this.usersService.update(+id, userUpdate);
  }

  // DELETE /users/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
