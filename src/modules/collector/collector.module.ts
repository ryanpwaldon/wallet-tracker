import { Module } from '@nestjs/common'
import { CollectorService } from './collector.service'
import { CollectorCron } from 'src/modules/collector/collector.cron'
import { AirtableModule } from 'src/modules/airtable/airtable.module'

@Module({
  imports: [AirtableModule],
  providers: [CollectorService, CollectorCron],
})
export class CollectorModule {}
