import { Module } from '@nestjs/common'
import { SlackModule } from 'src/modules/slack/slack.module'
import { AddressModule } from 'src/modules/address/address.module'
import { OpenseaModule } from 'src/modules/opensea/opensea.module'
import { CollectorModule } from 'src/modules/collector/collector.module'
import { TransactionCron } from 'src/modules/transaction/transaction.cron'

@Module({
  imports: [OpenseaModule, AddressModule, CollectorModule, SlackModule],
  providers: [TransactionCron],
})
export class TransactionModule {}
