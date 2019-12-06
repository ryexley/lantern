/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import { StoreProvider } from "#/store/gatsby"

export const wrapRootElement = StoreProvider
