import { Timeout } from '@nestjs/schedule'
import { Injectable } from '@nestjs/common'
import { OpenseaService } from 'src/modules/opensea/opensea.service'
import { AddressService } from 'src/modules/address/address.service'

@Injectable()
export class TransactionCron {
  constructor(private readonly addressService: AddressService, private readonly openseaService: OpenseaService) {}

  @Timeout(0)
  async findNewSales() {
    const addresses = await this.addressService.findAll()
    const fetchEventRequests = []
    const udpateCollectorRequests = []
    for (const address of addresses) {
      console.log(`Collector: ${address.fields.twitterHandle}`)
      const now = new Date().toISOString()
      fetchEventRequests.push(
        this.openseaService.findAllSaleEvents({
          address: <string>address.fields.address,
          occurredAfter: <string>address.fields.lastCheckedAt || now,
        }),
      )
      udpateCollectorRequests.push(address.updateFields({ lastCheckedAt: now }))
    }
    const events = await Promise.all(fetchEventRequests)
    console.log(events)
    await Promise.all(udpateCollectorRequests)
    console.log('Done')
    setTimeout(this.findNewSales.bind(this), 10000)
  }
}
