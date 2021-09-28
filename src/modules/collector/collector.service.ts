import { Injectable } from '@nestjs/common'
import { Collector } from '../../types/Collector'

@Injectable()
export class CollectorService {
  private collectors: Collector[] = []

  update(collectors: Collector[]) {
    this.collectors = collectors
  }

  getCollectors() {
    return this.collectors
  }
}
