import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Field extends Document {
  @Prop()
  component: string;

  @Prop()
  cols: number;

  @Prop()
  props: object;

  @Prop()
  styles: object;
}
