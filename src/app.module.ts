import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from '@nestjs/schedule'
import { AssetModule } from './modules/asset/asset.module'
import { SlackModule } from './modules/slack/slack.module'
import { OpenseaModule } from './modules/opensea/opensea.module'
import { AirtableModule } from './modules/airtable/airtable.module'
import { TransactionModule } from './modules/transaction/transaction.module'
import { CollectorModule } from './modules/collector/collector.module';

@Module({
  imports: [
    AssetModule,
    SlackModule,
    OpenseaModule,
    AirtableModule,
    TransactionModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({ useFactory: () => ({ uri: process.env.MONGO_URI }) }),
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.APP_ENV}`, isGlobal: true }),
    CollectorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
