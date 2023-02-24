import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query, Request, UnauthorizedException, UseGuards
} from "@nestjs/common";
import { FormsService } from './forms.service';
import { Form } from './schemas/form.schema';
import { UsersService } from "../users/users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('forms')
export class FormsController {
  constructor(
    private readonly formsService: FormsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Request() req,
    @Query('skip') skip = null,
    @Query('limit') limit = null,
  ): Promise<Form[]> {
    console.log(req.user.forms)
    return this.formsService.findAll(skip, limit, {_id: req.user.forms});
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOne(@Request() req, @Body() form): Promise<Form> {
    const res = await this.formsService.createOne(form);
    await this.usersService.assignForm(req.user.email, res._id.toString());
    return res;
  }

  @Get('count')
  @UseGuards(JwtAuthGuard)
  countAll(@Request() req): number {
    return req.user.forms.length;
  }

  @Get(':id([0-9a-fA-F]{24})')
  @UseGuards(JwtAuthGuard)
  async findOne(@Request() req, @Param() params): Promise<Form> {
    const form = await this.formsService.findOne(params.id);
    if (!form) {
      throw new HttpException('Form not found', 404);
    }


    return form;
  }

  @Put(':id([0-9a-fA-F]{24})')
  @UseGuards(JwtAuthGuard)
  updateOne(@Request() req, @Param() params, @Body() form): Promise<Form> {
    if (!req.user.forms.includes(params.id)) {
      throw new UnauthorizedException();
    }

    return this.formsService.updateOne(params.id, form);
  }
}
