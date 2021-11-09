import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import configuration from "./Config/config";

@Module({
  imports: [TodoModule, MongooseModule.forRoot("mongodb://localhost:27017/user_plug"
  ) , ConfigModule.forRoot({
    envFilePath:".dev.env", isGlobal:true, load:[configuration]
  }), PostModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
