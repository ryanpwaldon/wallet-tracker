import { Records } from 'airtable'
import { Injectable } from '@nestjs/common'
import { COLLECTORS_TABLE_NAME } from 'src/constants/Airtable'
import { AirtableService } from 'src/modules/airtable/airtable.service'

@Injectable()
export class CollectorService {
  constructor(private readonly airtableService: AirtableService) {}

  async findAll() {
    return this.airtableService.findAll(COLLECTORS_TABLE_NAME)
  }
}
