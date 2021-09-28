import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import axiosRateLimit from 'axios-rate-limit'

@Injectable()
export class OpenseaService {
  client: AxiosInstance

  constructor() {
    this.client = axiosRateLimit(axios.create({ baseURL: 'https://api.opensea.io/api/v1' }), { maxRPS: 5 })
  }

  async findAllSaleEvents({ address, occurredAfter }: { address: string; occurredAfter: string }) {
    let offset = 0
    let hasMore = true
    const limit = 20
    const allResults = []
    while (hasMore) {
      const response = await this.client({
        method: 'get',
        url: '/events',
        params: {
          limit,
          offset,
          only_opensea: false,
          event_type: 'successful',
          account_address: address,
          occurred_after: occurredAfter,
        },
      })
      const results = response.data.asset_events
      allResults.push(...results)
      const resultsCount = results.length
      if (resultsCount < limit) hasMore = false
      offset += resultsCount
    }
    return allResults
  }
}
