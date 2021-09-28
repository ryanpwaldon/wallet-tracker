import { Module } from '@nestjs/common'
import { AddressModule } from 'src/modules/address/address.module'
import { OpenseaModule } from 'src/modules/opensea/opensea.module'
import { TransactionCron } from 'src/modules/transaction/transaction.cron'

@Module({
  imports: [OpenseaModule, AddressModule],
  providers: [TransactionCron],
})
export class TransactionModule {}
