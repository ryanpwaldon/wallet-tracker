import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TransactionService } from './transaction.service'
import { OpenseaModule } from 'src/modules/opensea/opensea.module'
import { CollectorModule } from 'src/modules/collector/collector.module'
import { TransactionCron } from 'src/modules/transaction/transaction.cron'
import { Transaction, TransactionSchema } from 'src/modules/transaction/transaction.schema'

@Module({
  imports: [
    OpenseaModule,
    CollectorModule,
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
  ],
  providers: [TransactionService, TransactionCron],
  exports: [TransactionService],
})
export class TransactionModule {}
