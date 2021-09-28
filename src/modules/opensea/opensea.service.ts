import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import axiosRateLimit from 'axios-rate-limit'

@Injectable()
export class OpenseaService {
  client: AxiosInstance

  constructor() {
    this.client = axiosRateLimit(axios.create({ baseURL: 'https://www.quadrums.art/api/token', timeout: 5000 }), { maxRPS: 10 })
  }
}
