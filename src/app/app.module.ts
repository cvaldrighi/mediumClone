import { Module } from '@nestjs/common';
import { AppController } from '@app/app/app.controller';
import { AppService } from '@app/app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '@app/database/config';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig),TagModule],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
