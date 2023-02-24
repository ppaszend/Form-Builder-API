import { Controller, Delete, Get, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { User } from "./schemas/user.schema";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../roles.decorator";
import { Role } from "../role.enum";
import { RolesGuard } from "../auth/roles.guard";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async register(@Request() req) {
    const user = await this.usersService.create(
      req.body.email,
      req.body.password,
      req.body.fullName
    )
    this.usersService.sendConfirmationMail(user.email)
      .then((token) => {
        if (token) {
          console.log(token);
        } else {

        }
      })

    return {email: user.email, fullName: user.fullName}
  }

  @Post('resend-confirmation-mail')
  async resendConfirmationMail(@Request() req) {
    const user = await this.usersService.findOne(req.email);
    if (!user) {
      return HttpCode(404);
    }

    const token = await this.usersService.sendConfirmationMail(user.email);
    if (token) {
      return HttpCode(201);
    }

    return HttpCode(400);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async delete(@Request() req) {
    return this.usersService.delete(req.body.email);
  }
}
