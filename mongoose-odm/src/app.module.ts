import { Module } from '@nestjs/common';
import { MongoOdmModule } from './mongo-odm/mongo-odm.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MongoOdmModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
