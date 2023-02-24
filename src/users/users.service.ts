import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class UsersService {
    constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      private readonly mailerService: MailerService,
    ) {}

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async findOne(email: string): Promise<User|undefined> {
        return this.userModel.findOne({email: email})
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async create(
      email: string,
      password: string,
      fullName?: string,
      role: string='User'
    ): Promise<User | undefined> {
        return await this.userModel.create({
            email,
            fullName,
            password: await this.hashPassword(password),
            active: false,
            role
        });
    }

    delete(email: string): boolean {
        this.userModel.deleteOne({email}, (err) => {
            return !err;
        });
        return false;
    }

    private async generateConfirmationToken(email: string): Promise<string> {
        return await bcrypt.hash(email, 10);
    }

    async sendConfirmationMail(email: string): Promise<string | null> {
        const confirmationToken = await this.generateConfirmationToken(email);

        const mail = await this.mailerService.sendMail({
            to: email,
            subject: "Account confirmation",
            text: `Token: ${confirmationToken}`
        });

        if (mail.accepted.includes(email)) {
            return confirmationToken;
        }
        return null;
    }

    async assignForm(userEmail: string, formId: string | string[]): Promise<void> {
        await this.userModel.updateOne(
          { email: userEmail },
          {
              $push: {
                  forms: {
                      $each: typeof formId === "string" ? [formId] : formId
                  }
              }
          }
        )
    }
}
