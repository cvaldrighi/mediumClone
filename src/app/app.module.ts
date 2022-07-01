import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app/app.controller';
import { AppService } from '@app/app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '@app/database/config';
import { UserModule } from '@app/user/user.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { ArticleModule } from '@app/article/article.module';
import { ProfileModule } from '@app/profile/profile.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), TagModule, UserModule, ArticleModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
