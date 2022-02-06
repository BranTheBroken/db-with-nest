import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_DB_CONNECTION_STRING: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mongodb_conn_str = configService.get(
          'MONGO_DB_CONNECTION_STRING',
        );

        return {
          uri: mongodb_conn_str,
          dbName: 'learning',
        };
      },
    }),
  ],
})
export class DatabaseModule {}
