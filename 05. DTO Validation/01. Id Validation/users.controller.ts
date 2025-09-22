import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  ParseIntPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";

type RoleEnum = "INTERN" | "ENGINEER" | "ADMIN";

type UserType = {
  id: number;
  name: string;
  email: string;
  role: RoleEnum;
};

type UpdateUser = Omit<UserType, "id">;

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() userUpdate: UpdateUser
  ) {
    return this.usersService.update(id, userUpdate);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
