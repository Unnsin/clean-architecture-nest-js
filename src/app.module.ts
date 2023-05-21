import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationModule } from './Application/application.module';
import { PresentationModule } from './Presentation/presentation.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/clean-architecture'),
    PresentationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
