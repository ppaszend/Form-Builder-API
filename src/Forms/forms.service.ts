import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Form, FormDocument } from './schemas/form.schema';
import { FilterQuery, Model, Types } from "mongoose";

@Injectable()
export class FormsService {
  constructor(@InjectModel(Form.name) private formModel: Model<FormDocument>) {}

  async findAll(
    skip: number | null,
    limit: number | null,
    filter: FilterQuery<Document & Form & {_id: Types.ObjectId}> = {}
  ): Promise<Form[]> {
    if (limit === null) {
      return await this.formModel
        .find(filter)
        .skip(skip || 0)
        .populate('theme')
        .exec();
    }

    return await this.formModel
      .find({})
      .limit(limit)
      .skip(skip)
      .populate('theme')
      .exec();
  }

  findOne(id: string): Promise<Form | null> {
    return this.formModel.findOne({ _id: id }).populate('theme').exec();
  }

  async countAll(): Promise<number> {
    return await this.formModel.collection.countDocuments();
  }

  createOne(form: Form): Promise<FormDocument> {
    return this.formModel.create(form);
  }

  async updateOne(id: string, newForm: Form): Promise<Form> {
    const form = await this.formModel
      .findByIdAndUpdate(id, newForm)
      .setOptions({ overwrite: true, new: true });
    if (!form) {
      throw new NotFoundException();
    }
    return form;
  }
}
