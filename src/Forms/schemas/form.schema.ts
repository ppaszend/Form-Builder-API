import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Field } from './field.schema';
import { Theme } from '../../Themes/schemas/theme.schema';
import { Type } from 'class-transformer';

export type FormDocument = HydratedDocument<Form>;

@Schema()
export class Form {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Theme.name })
  @Type(() => Theme)
  theme: Theme;

  @Prop()
  steps: [Field];

  @Prop()
  created: Date;

  @Prop()
  updated: Date;

  @Prop()
  active: boolean;
}

export const FormSchema = SchemaFactory.createForClass(Form);
