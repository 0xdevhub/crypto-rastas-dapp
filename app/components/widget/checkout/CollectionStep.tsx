import { Heading, Text } from '@/app/components/typography'
import { PortfolioField } from '@/app/components/widget/checkout/PortfolioField'
import { NFTPortfolioResponse } from '@/app/lib/wallet/hooks/useSDK'
import { WalletButton } from '@/app/components/wallet/button'
import { Alert } from '@/app/components/Alert'
import appConfig from '@/app.config'

export type CollectionStepProps = {
  list: NFTPortfolioResponse[]
  marketplaceURL: string
  error?: string
  fieldId: string
  onNextStep: () => void
  isLimitReached?: boolean
}

export const CollectionStep = ({
  list,
  marketplaceURL,
  error,
  isLimitReached,
  fieldId,
  onNextStep
}: CollectionStepProps) => {
  return (
    <section className='flex flex-col justify-start space-y-8'>
      <div className='flex flex-col space-y-2'>
        <Heading as='h3'>Select your tokens</Heading>
        <Text size='sm'>
          Before start, select your token IDs that’s going to be used to bridge
          to destination chain.
        </Text>
      </div>
      <PortfolioField
        fieldId={fieldId}
        list={list}
        marketplaceURL={marketplaceURL}
      />

      <div className='flex flex-col space-y-8'>
        {isLimitReached && (
          <Alert variant='warning'>
            <Text size='sm'>
              You reached the maximum of {appConfig.bridge.transferNFTLimit}{' '}
              tokens to bridge
            </Text>
          </Alert>
        )}
        {error && (
          <Alert variant='danger'>
            <Text size='sm'>{error}</Text>
          </Alert>
        )}
        <div>
          <WalletButton fullWidth={false} type='button' onClick={onNextStep}>
            Continue
          </WalletButton>
        </div>
      </div>
    </section>
  )
}

export default CollectionStep
