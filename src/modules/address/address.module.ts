import { Module } from '@nestjs/common'
import { AddressService } from './address.service'
import { AirtableModule } from 'src/modules/airtable/airtable.module'

@Module({
  imports: [AirtableModule],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
