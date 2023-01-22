import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Theme, ThemeDocument } from './schemas/theme.schema';
import { Model } from 'mongoose';

@Injectable()
export class ThemesService {
  constructor(
    @InjectModel(Theme.name) private themeModel: Model<ThemeDocument>,
  ) {}

  findOne(id: string): Promise<Theme | null> {
    return this.themeModel.findOne({ _id: id }).exec();
  }

  createOne(theme: Theme): Promise<Theme> {
    return this.themeModel.create(theme);
  }
}
