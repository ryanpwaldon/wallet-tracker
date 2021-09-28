import { Module } from '@nestjs/common'
import { AssetService } from './asset.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Asset, AssetSchema } from 'src/modules/asset/asset.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Asset.name,
        schema: AssetSchema,
      },
    ]),
  ],
  providers: [AssetService],
})
export class AssetModule {}
