import { Injectable } from '@nestjs/common'
import Airtable, { FieldSet, RecordData } from 'airtable'
import { AirtableBase } from 'airtable/lib/airtable_base'

@Injectable()
export class AirtableService {
  private readonly base: AirtableBase

  constructor() {
    this.base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID as string)
  }

  findAll(table: string) {
    return this.base(table).select({}).all()
  }

  async updateMany(table: string, records: RecordData<Partial<FieldSet>>[]) {
    let processed = 0
    while (processed < records.length) {
      const recordsToUpdate = records.slice(processed, processed + 10)
      const updatedRecords = await this.base(table).update(recordsToUpdate)
      processed += updatedRecords.length
    }
  }
}
