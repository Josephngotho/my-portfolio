/**
 * Utility to load an image with fallback to alternate extensions
 * (.jpeg, .jpg, .png, .webp) in case file format differs.
 */
export function resolveImage(src) {
  if (!src) return Promise.resolve(null)

  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = () => {
      const exts = ['.jpg', '.jpeg', '.png', '.webp']
      const match = src.match(/\.(jpg|jpeg|png|webp)$/i)
      if (!match) {
        resolve(null)
        return
      }

      const currentExt = match[0].toLowerCase()
      const alternatives = exts.filter((e) => e !== currentExt)

      const tryNext = (idx) => {
        if (idx >= alternatives.length) {
          resolve(null)
          return
        }
        const altSrc = src.replace(/\.(jpg|jpeg|png|webp)$/i, alternatives[idx])
        const testImg = new Image()
        testImg.onload = () => resolve(altSrc)
        testImg.onerror = () => tryNext(idx + 1)
        testImg.src = altSrc
      }

      tryNext(0)
    }
    img.src = src
  })
}
