'use client'

import {
  useBalance,
  useChainContract,
  useNetwork,
  useWallet
} from '@/app/lib/wallet/hooks'
import { Checkout } from './checkout/Checkout'
import useNFTPortfolio from '@/app/lib/wallet/hooks/useNFTPortfolio'

export const Widget = () => {
  const { isConnected, isConnecting, address } = useWallet()
  const { config, chain } = useNetwork()

  const collectionContract = useChainContract('token')
  const bridgeContract = useChainContract('bridge')

  const { value: balanceValue } = useBalance()

  const { list, refetch } = useNFTPortfolio({
    contractAddress: collectionContract?.address,
    owner: String(address),
    skip: !address || !collectionContract?.address
  })

  return (
    <Checkout
      list={list}
      collectionAddress={collectionContract.address}
      bridgeAddress={bridgeContract.address}
      senderAddress={address}
      enabled={isConnected && !isConnecting && !!address && !chain?.unsupported}
      currentChain={config}
      balance={balanceValue || 0n}
      onRefetchList={refetch}
    />
  )
}

export default Widget
