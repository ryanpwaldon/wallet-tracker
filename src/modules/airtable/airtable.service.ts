import Airtable from 'airtable'
import { Injectable } from '@nestjs/common'
import { AirtableBase } from 'airtable/lib/airtable_base'

export interface AirtableSort {
  field: string
  direction?: 'asc' | 'desc'
}

export interface AirtableFindAllQuery {
  table: string
  page?: number
  filter?: string
  fields?: string[]
  sort?: AirtableSort[]
}

@Injectable()
export class AirtableService {
  private readonly base: AirtableBase

  constructor() {
    this.base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID as string)
  }

  async findAll({ table, fields, page, sort, filter }: AirtableFindAllQuery) {
    page = page || 1
    sort = sort || []
    fields = fields || []
    const pageSize = 30
    const offset = page * pageSize - pageSize
    const query = this.base(table).select({ fields, sort, offset, pageSize, filterByFormula: filter })
    return (await query.firstPage()).map((item) => item.fields)
  }
}
