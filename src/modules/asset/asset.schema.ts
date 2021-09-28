import { Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class Asset {}

export type AssetDocument = Asset & Document
export const AssetSchema = SchemaFactory.createForClass(Asset)
