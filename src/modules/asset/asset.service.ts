import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Asset, AssetDocument } from 'src/modules/asset/asset.schema'

@Injectable()
export class AssetService {
  constructor(@InjectModel(Asset.name) private readonly assetModel: Model<AssetDocument>) {}

  createMany(assets: Asset[]) {
    return this.assetModel.insertMany(assets, { ordered: false })
  }
}
