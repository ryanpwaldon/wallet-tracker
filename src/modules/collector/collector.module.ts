import { Module } from '@nestjs/common'
import { CollectorService } from './collector.service'
import { AirtableModule } from 'src/modules/airtable/airtable.module'

@Module({
  imports: [AirtableModule],
  providers: [CollectorService],
})
export class CollectorModule {}
