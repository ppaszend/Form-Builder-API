import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Form, FormDocument } from './schemas/form.schema';
import { Model } from 'mongoose';

@Injectable()
export class FormsService {
  constructor(@InjectModel(Form.name) private formModel: Model<FormDocument>) {}

  findAll(page: number): string {
    return 'Page ' + page;
  }

  findOne(id: string): Promise<Form | null> {
    return this.formModel.findOne({ _id: id }).populate('theme').exec();
  }

  createOne(form: Form): Promise<Form> {
    return this.formModel.create(form);
  }
}
