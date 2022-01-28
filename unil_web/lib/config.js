// lib/config.js
export const config = {
    /**
     * Find your project ID and dataset in `sanity.json` in your studio project.
     * These are considered “public”, but you can use environment variables
     * if you want differ between local dev and production.
     *
     * https://nextjs.org/docs/basic-features/environment-variables
     **/
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "unil",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "clrua9n3",
    apiVersion: 'v1', // Learn more: https://www.sanity.io/docs/api-versioning
    /**
     * Set useCdn to `false` if your application require the freshest possible
     * data always (potentially slightly slower and a bit more expensive).
     * Authenticated request (like preview) will always bypass the CDN
     **/
    useCdn: false//process.env.NODE_ENV === 'production',
}