import { Timeout } from '@nestjs/schedule'
import { Injectable } from '@nestjs/common'
import { OpenseaService } from 'src/modules/opensea/opensea.service'
import { CollectorService } from 'src/modules/collector/collector.service'

@Injectable()
export class TransactionCron {
  constructor(private readonly collectorService: CollectorService, private readonly openseaService: OpenseaService) {}

  @Timeout(0)
  async findNewSales() {
    const collectors = await this.collectorService.findAll()
    const fetchEventRequests = []
    const udpateCollectorRequests = []
    for (const collector of collectors) {
      console.log(`Collector: ${collector.fields.twitterHandle}`)
      const now = new Date().toISOString()
      fetchEventRequests.push(
        this.openseaService.findAllSaleEvents({
          address: <string>collector.fields.address,
          occurredAfter: <string>collector.fields.lastCheckedAt || now,
        }),
      )
      udpateCollectorRequests.push(collector.updateFields({ lastCheckedAt: now }))
    }
    const events = await Promise.all(fetchEventRequests)
    console.log(events)
    await Promise.all(udpateCollectorRequests)
    console.log('Done')
    setTimeout(this.findNewSales.bind(this), 10000)
  }
}
