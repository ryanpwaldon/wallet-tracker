import { Injectable } from '@nestjs/common'
import { ADDRESSES_TABLE_NAME } from 'src/constants/Airtable'
import { AirtableService } from 'src/modules/airtable/airtable.service'

@Injectable()
export class AddressService {
  constructor(private readonly airtableService: AirtableService) {}

  async findAll() {
    return this.airtableService.findAll(ADDRESSES_TABLE_NAME)
  }
}
