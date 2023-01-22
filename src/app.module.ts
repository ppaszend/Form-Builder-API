import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormsModule } from './Forms/forms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ThemesModule } from './Themes/themes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    FormsModule,
    ThemesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
