import { Injectable } from '@nestjs/common'
import { AxiosResponse } from '@nestjs/common/node_modules/axios'
import axios, { AxiosInstance } from 'axios'
import axiosRateLimit from 'axios-rate-limit'
import { AssetEvent, OpenseaQueryEventsResponse } from 'src/types/OpenseaQueryEventsResponse'

@Injectable()
export class OpenseaService {
  client: AxiosInstance

  constructor() {
    this.client = axiosRateLimit(axios.create({ baseURL: 'https://api.opensea.io/api/v1' }), { maxRPS: 5 })
  }

  async findRecentSaleEvent(address: string): Promise<AssetEvent | undefined> {
    const response = (await this.client({
      method: 'get',
      url: '/events',
      params: {
        limit: 1,
        only_opensea: false,
        event_type: 'successful',
        account_address: address,
      },
    })) as AxiosResponse<OpenseaQueryEventsResponse>
    const [event] = response.data.asset_events
    return event
  }

  // find sale events that occurred after a particular eventId
  async findNewSaleEvents({ address, stopAtEvent }: { address: string; stopAtEvent?: string }) {
    let offset = 0
    let complete = false
    const limit = 20
    const newEvents = []
    while (!complete) {
      const response = (await this.client({
        method: 'get',
        url: '/events',
        params: {
          limit,
          offset,
          only_opensea: false,
          event_type: 'successful',
          account_address: address,
        },
      })) as AxiosResponse<OpenseaQueryEventsResponse>
      const events = response.data.asset_events
      const stopAtEventIndex = events.findIndex((event) => event.id.toString() === stopAtEvent)
      if (stopAtEventIndex >= 0) {
        newEvents.push(...events.slice(0, stopAtEventIndex))
        complete = true
      } else {
        newEvents.push(...events)
        const eventCount = events.length
        if (eventCount < limit) complete = true
        offset += eventCount
      }
    }
    return newEvents
  }
}
