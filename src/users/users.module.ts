import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/user.schema";
import { UsersController } from './users.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: `smtps://${process.env.MAIL_USER}:${process.env.MAIL_PASS}@${process.env.MAIL_DOMAIN}`,
      defaults: {
        from: 'Form Builder Service',
      },
      // template: {
      //   dir: __dirname + '/templates',
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
