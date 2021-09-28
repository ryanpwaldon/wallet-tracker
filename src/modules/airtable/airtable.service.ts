import { Injectable } from '@nestjs/common'
import Airtable, { FieldSet } from 'airtable'
import { AirtableBase } from 'airtable/lib/airtable_base'

@Injectable()
export class AirtableService {
  private readonly base: AirtableBase

  constructor() {
    this.base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID as string)
  }

  async findAll(table: string) {
    const results = await this.base(table).select({}).all()
    const simpleResults = results.map((result) => result.fields)
    return simpleResults
  }
}
