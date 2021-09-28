import { Injectable } from '@nestjs/common'
import { Collector } from '../../types/Collector'
import { Cron, CronExpression } from '@nestjs/schedule'
import { COLLECTORS_TABLE_NAME } from 'src/constants/Airtable'
import { AirtableService } from 'src/modules/airtable/airtable.service'
import { CollectorService } from 'src/modules/collector/collector.service'

@Injectable()
export class CollectorCron {
  constructor(private readonly airtableService: AirtableService, private readonly collectorService: CollectorService) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async update() {
    const collectors = (await this.airtableService.findAll(COLLECTORS_TABLE_NAME)) as Collector[]
    this.collectorService.update(collectors)
  }
}
