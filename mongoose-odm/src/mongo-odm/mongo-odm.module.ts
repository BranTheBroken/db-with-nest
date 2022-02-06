import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.model';
import { MongoOdmService } from './mongo-odm.service';
import { MongoOdmController } from './mongo-odm.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    HttpModule,
  ],
  providers: [MongoOdmService],
  controllers: [MongoOdmController],
})
export class MongoOdmModule {}
