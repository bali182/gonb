export function svgToDataUri(svg: string): string {
  // Encode special characters for use in a URL
  const encodedSvg = encodeURIComponent(svg)
    // EncodeURIComponent does not encode these characters so we manually replace them
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')
    .replace(/%20/g, ' ')

  // Return the Data URI string
  return `data:image/svg+xml,${encodedSvg}`
}
