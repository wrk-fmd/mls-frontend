export interface StompConfiguration {
  rootUrl?: string;
}

/**
 * This takes the root URL for the API and transforms it into an URL for the WebSocket protocol
 * @param rootUrl The absolute,
 */
export function buildWebSocketUrl(rootUrl: string): string {
  if (/^https?:\/\//.test(rootUrl)) {
    // Full URL with scheme, just replace http/https with ws/wss
    return rootUrl.replace(/^http/, 'ws');
  }

  const scheme = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  if (rootUrl.startsWith('//')) {
    // Protocol-relative URL
    return scheme + rootUrl;
  }

  if (rootUrl.startsWith('/')) {
    // Absolute path
    return `${scheme}//${location.host}${rootUrl}`;
  }

  throw new Error('Encountered relative path as root URL for API');
}
