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
    console.log('Job findNewSales in progress.')
    const addresses = await this.addressService.findAll(`NOT(lastEventChecked = BLANK())`)
    const collectors = await this.collectorService.findAll()
    const lastEventCheckedByAddress: Record<string, string> = {} // [addressId]: eventId
    const eventsGroupedByAddress = await Promise.all(
      addresses.map((address) =>
        this.openseaService.findNewSaleEvents({
          address: <string>address.fields.address,
          stopAtEvent: <string>address.fields.lastEventChecked,
        }),
      ),
    )
    for (let i = 0; i < eventsGroupedByAddress.length; i++) {
      const address = addresses[i]
      const eventGroup = eventsGroupedByAddress[i]
      const collector = collectors.find((collector) => (collector.fields.addresses as string[]).includes(address.id))
      for (let i = 0; i < eventGroup.length; i++) {
        const event = eventGroup[0]
        if (i === 0) lastEventCheckedByAddress[address.id] = event.id.toString()
        const txnType = event.seller?.address === address.fields.address ? 'sell' : 'buy'
        const txnIsBundle = !!event.asset_bundle
        const txnPrice = event.total_price / Math.pow(10, event.payment_token.decimals)
        const txnCurrency = event.payment_token.symbol
        const assetName = event.asset?.name
        const assetLink = event.asset?.permalink
        const assetImage = event.asset?.image_url
        const collectionName = event.asset?.collection.name
        const bundleName = event.asset_bundle?.name
        const bundleLink = event.asset_bundle?.permalink
        const message = txnIsBundle
          ? `${collector?.fields.twitterHandle} ${txnType === 'buy' ? 'bought' : 'sold'} ${bundleName} for ${txnPrice}${txnCurrency}.\n${bundleLink}`
          : `${collector?.fields.twitterHandle} ${txnType === 'buy' ? 'bought' : 'sold'} ${assetName} for ${txnPrice}${txnCurrency}.\n${assetLink}`
        this.slackService.send(message)
        console.log(message)
      }
    }
    await Promise.all(addresses.map((address) => address.updateFields({ lastEventChecked: lastEventCheckedByAddress[address.id] })))
    setTimeout(this.findNewSales.bind(this), 10000)
    console.log('Job findNewSales complete.')
  }

  @Timeout(0)
  async updateNewAddresses() {
    console.log('Job updateNewAddresses in progress.')
    try {
      const addresses = await this.addressService.findAll(`lastEventChecked = BLANK()`)
      const events = await Promise.all(addresses.map((address) => this.openseaService.findRecentSaleEvent(<string>address.fields.address))) // prettier-ignore
      await Promise.all(addresses.map((address, i) => address.updateFields({ lastEventChecked: events[i]?.id.toString() })))
    } catch (err) {
      console.log(err)
    }
    console.log('Job updateNewAddresses complete.')
    setTimeout(this.updateNewAddresses.bind(this), 60000)
  }
}
