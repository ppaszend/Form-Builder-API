import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { Form } from './schemas/form.schema';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get()
  findAll(
    @Query('skip') skip = null,
    @Query('limit') limit = null,
  ): Promise<Form[]> {
    return this.formsService.findAll(skip, limit);
  }

  @Post()
  createOne(@Body() form): Promise<Form> {
    return this.formsService.createOne(form);
  }

  @Get('count')
  async countAll(): Promise<number> {
    return await this.formsService.countAll();
  }

  @Get(':id([0-9a-fA-F]{24})')
  async findOne(@Param() params): Promise<Form> {
    const form = await this.formsService.findOne(params.id);
    if (!form) {
      throw new HttpException('Form not found', 404);
    }

    return form;
  }

  @Put(':id([0-9a-fA-F]{24})')
  updateOne(@Param() param, @Body() form): Promise<Form> {
    return this.formsService.updateOne(param.id, form);
  }
}
