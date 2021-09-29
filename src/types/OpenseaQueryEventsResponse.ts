export interface OpenseaQueryEventsResponse {
  asset_events: AssetEvent[]
}

export interface AssetEvent {
  id: number
  asset: Asset
  duration: null
  bid_amount: null
  quantity: string
  to_account: null
  asset_bundle: null
  created_date: Date
  ending_price: null
  from_account: null
  owner_account: null
  total_price: number
  starting_price: null
  approved_account: null
  collection_slug: string
  custom_event_name: null
  contract_address: string
  transaction: Transaction
  is_private: boolean | null
  payment_token: PaymentToken
  seller: UserAccount | null
  winner_account: UserAccount
  auction_type: string | null
  event_type: 'successful' | 'transfer'
  dev_fee_payment_event: DevFeePaymentEvent | null
}

export interface Asset {
  id: number
  token_id: string
  num_sales: number
  image_url: string
  permalink: string
  name: null | string
  owner: UserAccount
  collection: Collection
  decimals: number | null
  image_preview_url: string
  description: null | string
  image_thumbnail_url: string
  animation_url: null | string
  external_link: null | string
  asset_contract: AssetContract
  token_metadata: null | string
  background_color: null | string
  image_original_url: null | string
  animation_original_url: null | string
}

export interface AssetContract {
  name: string
  symbol: string
  address: string
  created_date: Date
  description: string
  owner: number | null
  schema_name: SchemaName
  image_url: null | string
  default_to_fiat: boolean
  nft_version: string | null
  total_supply: null | string
  asset_contract_type: string
  external_link: null | string
  payout_address: string | null
  buyer_fee_basis_points: number
  opensea_version: string | null
  only_proxied_transfers: boolean
  seller_fee_basis_points: number
  dev_buyer_fee_basis_points: number
  dev_seller_fee_basis_points: number
  opensea_buyer_fee_basis_points: number
  opensea_seller_fee_basis_points: number
}

export enum SchemaName {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
  Cryptopunks = 'CRYPTOPUNKS',
}

export interface Collection {
  name: string
  slug: string
  hidden: boolean
  featured: boolean
  image_url: string
  created_date: Date
  description: string
  external_url: string
  require_email: boolean
  chat_url: null | string
  short_description: null
  wiki_url: null | string
  default_to_fiat: boolean
  display_data: DisplayData
  discord_url: null | string
  telegram_url: null | string
  payout_address: string | null
  large_image_url: null | string
  medium_username: null | string
  banner_image_url: null | string
  safelist_request_status: string
  only_proxied_transfers: boolean
  twitter_username: string | null
  is_subject_to_whitelist: boolean
  featured_image_url: null | string
  instagram_username: string | null
  dev_buyer_fee_basis_points: string
  dev_seller_fee_basis_points: string
  opensea_buyer_fee_basis_points: string
  opensea_seller_fee_basis_points: string
}

export interface DisplayData {
  card_display_style: 'contain' | 'cover' | 'padded'
}

export interface UserAccount {
  config: string
  address: string
  user: User | null
  profile_img_url: string
}

export interface User {
  username: null | string
}

export interface DevFeePaymentEvent {
  asset: null
  quantity: null
  total_price: null
  asset_bundle: null
  event_type: string
  auction_type: null
  created_date: Date
  event_timestamp: Date
  transaction: Transaction
  payment_token: PaymentToken
}

export interface PaymentToken {
  id: number
  address: string
  decimals: number
  image_url: string
  eth_price: string
  usd_price: string
  symbol: 'ETH' | 'WETH'
  name: 'Ether' | 'Wrapped Ether'
}

export interface Transaction {
  id: number
  timestamp: Date | null
  transaction_hash: string
  block_hash: null | string
  transaction_index: string
  block_number: null | string
  to_account: UserAccount | null
  from_account: UserAccount | null
}
