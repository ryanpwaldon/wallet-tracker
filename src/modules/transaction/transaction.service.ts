import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Transaction, TransactionDocument } from 'src/modules/transaction/transaction.schema'

@Injectable()
export class TransactionService {
  constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>) {}

  createMany(transactions: Transaction[]) {
    return this.transactionModel.insertMany(transactions)
  }
}
