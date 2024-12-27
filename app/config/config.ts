import { reduce, merge } from 'lodash'
import {
  polygonMumbai,
  polygon,
  mainnet,
  sepolia,
  base,
  baseSepolia,
  Chain
} from './chains'

export const mainnets = [mainnet, polygon, base]
export const testnets = [sepolia, polygonMumbai, baseSepolia]

export const allowedChains = (
  process.env.NEXT_PUBLIC_TESTNET_MODE === '1' ? testnets : mainnets
) as Chain[]

export const allowedChainsConfig = reduce(
  allowedChains,
  (acc, chain: Chain) =>
    merge(acc, {
      [chain.id]: chain
    }),
  {} as { [key: number]: Chain }
)
