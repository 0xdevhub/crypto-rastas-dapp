import { Chain } from '@/app/config/chains'
import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useNFTPortfolio'
import classNames from 'classnames'
import { Children } from 'react'
import { useFormContext } from 'react-hook-form'
import { NetworkThumbnail } from '@/app/components/wallet/network/Thumbnail'
import { Heading, Text } from '@/app/components/typography'
import Image from 'next/image'
import { filter, find, split, map, reduce, concat } from 'lodash'

export type DetailsProps = {
  tokenIdsFieldId: string
  destinationChainFieldId: string
  tokenList: NFTPortfolioResponse[]
  chainList: Chain[]
}

export const Details = ({
  tokenIdsFieldId,
  destinationChainFieldId,
  tokenList,
  chainList
}: DetailsProps) => {
  const { watch } = useFormContext()

  const tokenIdsFieldValue: string = watch(tokenIdsFieldId, '')

  const destinationChainFieldValue: number | undefined = watch(
    destinationChainFieldId
  )

  const tokenIdsList = filter(
    map(split(tokenIdsFieldValue, ','), String),
    Boolean
  )

  const selectedTokenIds = filter(
    reduce<string, NFTPortfolioResponse[]>(
      tokenIdsList,
      (acc, tokenId) =>
        concat(acc, [find(tokenList, { tokenId })]) as NFTPortfolioResponse[],
      []
    ),
    Boolean
  )

  const selectedChain = find(chainList, { id: destinationChainFieldValue })

  return (
    <div className='flex flex-col space-y-8'>
      <div className='flex flex-col space-y-2'>
        <Heading as='h4'>Transferring tokens</Heading>
        <ul className='flex flex-wrap gap-4'>
          {Children.toArray(
            selectedTokenIds.map((NFT) => (
              <li className='flex items-center space-x-2'>
                <div
                  className={classNames(
                    'relative h-10 w-10 overflow-hidden rounded-lg'
                  )}
                >
                  <Image
                    src={NFT.tokenURI}
                    alt={NFT.tokenId}
                    fill
                    sizes={` 
                    100%
                 `}
                  />
                </div>
                <Text variant='default' className='font-bold'>
                  #{NFT.tokenId}
                </Text>
              </li>
            ))
          )}
        </ul>
      </div>
      {selectedChain && (
        <div className='flex flex-col space-y-2'>
          <Heading as='h4'>To destination chain</Heading>
          <div className='flex items-center space-x-2'>
            <NetworkThumbnail
              width={20}
              height={20}
              src={`/assets/chains/${selectedChain?.id}.svg`}
            />
            <Text>{selectedChain?.name}</Text>
          </div>
        </div>
      )}
      <div className='flex flex-col space-y-2'>
        <Heading as='h4'>Paying as required fees</Heading>
        <Text>0 ETH</Text>
      </div>
    </div>
  )
}

export default Details
