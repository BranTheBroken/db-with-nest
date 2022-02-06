import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import Cat from '../entities/cat.entity';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CatSchema } from 'src/models/cat.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat]),
    MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }]),
    HttpModule,
  ],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
