import {
    createClient,
    createCurrentUserHook,
    createImageUrlBuilder,
    createPortableTextComponent,
    createPreviewSubscriptionHook
} from 'next-sanity'

import { config } from './config'
import { serializers } from './serializers'

export const urlFor = (source) => createImageUrlBuilder(config).image(source)

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
    ...config,
    // (https://github.com/sanity-io/block-content-to-react)
    serializers: serializers,
})

export const sanityClient = createClient(config)

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)