import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    userId: number;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    fullName?: string;

    @Prop()
    active: boolean;

    @Prop()
    role: [];

    @Prop()
    forms: [];
}

export const UserSchema = SchemaFactory.createForClass(User);
