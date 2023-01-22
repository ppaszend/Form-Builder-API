import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { ThemesService } from './themes.service';
import { Theme } from './schemas/theme.schema';

@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Get(':id([0-9a-fA-F]{24})')
  async findOne(@Param() params): Promise<Theme> {
    const theme = await this.themesService.findOne(params.id);
    if (!theme) {
      throw new HttpException('Theme not found', 404);
    }

    return theme;
  }

  @Post()
  createOne(@Body() theme): Promise<Theme> {
    return this.themesService.createOne(theme);
  }
}
