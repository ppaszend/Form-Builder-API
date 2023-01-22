import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ThemeDocument = HydratedDocument<Theme>;

@Schema()
export class Theme {
  @Prop()
  name: string;

  @Prop()
  fields: [
    {
      component: string;
      styles: object;
    },
  ];

  @Prop({ type: Object })
  label: object;

  @Prop({ type: Object })
  section: object;
}

export const ThemeSchema = SchemaFactory.createForClass(Theme);
