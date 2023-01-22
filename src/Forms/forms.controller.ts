import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { Form } from './schemas/form.schema';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get()
  findAll(@Query('page') page = 1): string {
    return this.formsService.findAll(page);
  }

  @Get(':id([0-9a-fA-F]{24})')
  async findOne(@Param() params): Promise<Form> {
    const form = await this.formsService.findOne(params.id);
    if (!form) {
      throw new HttpException('Form not found', 404);
    }

    return form;
  }

  @Post()
  createOne(@Body() form): Promise<Form> {
    return this.formsService.createOne(form);
  }
}
