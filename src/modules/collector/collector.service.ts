import { Injectable } from '@nestjs/common'
import { Timeout } from '@nestjs/schedule'
import { COLLECTORS_TABLE_NAME } from 'src/constants/Airtable'
import { AirtableService } from 'src/modules/airtable/airtable.service'

@Injectable()
export class CollectorService {
  constructor(private readonly airtableService: AirtableService) {}

  @Timeout(0)
  async findAll() {
    const collectors = await this.airtableService.findAll({ table: COLLECTORS_TABLE_NAME })
    console.log(collectors)
  }
}
