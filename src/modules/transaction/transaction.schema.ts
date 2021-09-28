import { Document } from 'mongoose'
import { TransactionType } from 'src/types/TransactionType'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true })
  type!: TransactionType

  @Prop({ required: true })
  value!: number

  @Prop({ required: true })
  currency!: number

  @Prop({ required: true, unique: true })
  hash!: string

  @Prop({ required: true })
  contractAddress!: string

  @Prop({ required: true })
  tokenId!: string
}

export type TransactionDocument = Transaction & Document
export const TransactionSchema = SchemaFactory.createForClass(Transaction)
