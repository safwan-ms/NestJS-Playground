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

type RoleEnum = 'INTERN' | 'ENGINEER' | 'ADMIN';
@Controller('users')
export class UsersController {
  // GET /users
  @Get()
  findAll(@Query('role') role?: RoleEnum) {
    return { role };
  }

  @Get('interns')
  findAllInterns() {
    return [];
  }
  // GET /users/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  // POST /users
  @Post()
  create(@Body() user: object) {
    return user;
  }

  // PATCH /users/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() userUpdate: object) {
    return { id, ...userUpdate };
  }

  // DELETE /users/:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id };
  }
}
