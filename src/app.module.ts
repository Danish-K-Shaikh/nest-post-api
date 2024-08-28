import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }, AppService],
})
export class AppModule {}
