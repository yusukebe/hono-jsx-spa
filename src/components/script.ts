import { Fragment, jsx } from 'hono/jsx'
import type { Manifest } from 'vite'

type Options = {
  src: string
  async?: boolean
  prod?: boolean
  manifest?: Manifest
  nonce?: string
}

export const Script = (options: Options): any => {
  const src = options.src
  if (options.prod ?? import.meta.env.PROD) {
    let manifest = options.manifest
    if (!manifest) {
      const MANIFEST = import.meta.glob<{ default: Manifest }>('/dist/.vite/manifest.json', {
        eager: true
      })
      for (const [, manifestFile] of Object.entries(MANIFEST)) {
        if (manifestFile['default']) {
          manifest = manifestFile['default']
          break
        }
      }
    }
    if (manifest) {
      const scriptInManifest = manifest[src.replace(/^\//, '')]
      if (scriptInManifest) {
        return jsx('script', {
          type: 'module',
          async: !!options.async,
          src: `/${scriptInManifest.file}`,
          nonce: options.nonce
        })
      }
    }
    return jsx(Fragment, {})
  } else {
    return jsx('script', { type: 'module', async: !!options.async, src, nonce: options.nonce })
  }
}
