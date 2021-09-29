import { Timeout } from '@nestjs/schedule'
import { Injectable } from '@nestjs/common'
import { SlackService } from 'src/modules/slack/slack.service'
import { OpenseaService } from 'src/modules/opensea/opensea.service'
import { AddressService } from 'src/modules/address/address.service'
import { CollectorService } from 'src/modules/collector/collector.service'

@Injectable()
export class TransactionCron {
  constructor(
    private readonly slackService: SlackService,
    private readonly openseaService: OpenseaService,
    private readonly addressService: AddressService,
    private readonly collectorService: CollectorService,
  ) {}

  @Timeout(0)
  async findNewSales() {
    console.log('Check in progress.')

    const addresses = await this.addressService.findAll()
    const collectors = await this.collectorService.findAll()
    const addressLastCheckedAt: Record<string, string> = {} // [addressId]: date

    const eventsGroupedByAddress = await Promise.all(
      addresses.map((address) => {
        const now = new Date().toISOString()
        addressLastCheckedAt[address.id] = now
        return this.openseaService.findAllSaleEvents({
          address: <string>address.fields.address,
          occurredAfter: <string>address.fields.lastCheckedAt || now,
        })
      }),
    )

    for (let i = 0; i < eventsGroupedByAddress.length; i++) {
      const address = addresses[i]
      const eventGroup = eventsGroupedByAddress[i]
      const collector = collectors.find((collector) => (collector.fields.addresses as string[]).includes(address.id))
      for (const event of eventGroup) {
        const txnType = event.seller?.address === address.fields.address ? 'sell' : 'buy'
        const txnPrice = event.total_price / Math.pow(10, event.payment_token.decimals)
        const txnCurrency = event.payment_token.symbol
        const collectionName = event.asset.collection.name
        const assetName = event.asset.name
        const assetImage = event.asset.image_url
        const link = event.asset.permalink
        const message = `${collector?.fields.twitterHandle} ${txnType === 'buy' ? 'bought' : 'sold'} ${assetName} for ${txnPrice}${txnCurrency}.\n${link}` // prettier-ignore
        this.slackService.send(message)
        console.log(message)
      }
    }

    await Promise.all(addresses.map((address) => address.updateFields({ lastCheckedAt: addressLastCheckedAt[address.id] })))
    setTimeout(this.findNewSales.bind(this), 10000)

    console.log('Check complete.')
  }
}
