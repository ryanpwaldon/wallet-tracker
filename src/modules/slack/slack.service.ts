import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IncomingWebhook } from '@slack/webhook'

@Injectable()
export class SlackService {
  private readonly client: IncomingWebhook

  constructor(private readonly configService: ConfigService) {
    this.client = new IncomingWebhook(<string>this.configService.get('SLACK_WEBHOOK_URL'))
  }

  send(text: string) {
    this.client.send({ text })
  }
}
