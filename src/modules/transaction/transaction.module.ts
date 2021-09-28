import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TransactionService } from './transaction.service'
import { OpenseaModule } from 'src/modules/opensea/opensea.module'
import { Transaction, TransactionSchema } from 'src/modules/transaction/transaction.schema'

@Module({
  imports: [
    OpenseaModule,
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
  ],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
