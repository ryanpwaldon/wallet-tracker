import { Injectable } from '@nestjs/common'
import { Collector } from '../../types/Collector'
import { Cron, CronExpression } from '@nestjs/schedule'
import { COLLECTORS_TABLE_NAME } from 'src/constants/Airtable'
import { AirtableService } from 'src/modules/airtable/airtable.service'

@Injectable()
export class CollectorService {
  collectors: Collector[] = []

  constructor(private readonly airtableService: AirtableService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async updateAll() {
    this.collectors = (await this.airtableService.findAll(COLLECTORS_TABLE_NAME)) as Collector[]
  }

  async findAll() {
    return this.collectors
  }
}
