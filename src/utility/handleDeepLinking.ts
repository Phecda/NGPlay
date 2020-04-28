import { Linking } from 'react-native';
import { useEffect } from 'react';
import { rootNavigate, AllRouteNames } from './rootNavigation';
import URLParse from 'url-parse';

export const appScheme = 'ngplay:';
export const universalLink = '';

export function handleUrl(url?: string | null) {
  if (!url) return;
  const urlParse = new URLParse(url, true);
  if (urlParse.protocol === appScheme) {
    const routeName = urlParse.pathname.substring(1) as AllRouteNames;
    const params = urlParse.query;
    if (routeName) {
      rootNavigate(routeName, params);
    }
  }
}

export function handleUrlEvent(event: { url: string }) {
  handleUrl(event.url);
}

export function useDeepLinking() {
  Linking.getInitialURL().then(handleUrl);
  useEffect(() => {
    Linking.addEventListener('url', handleUrlEvent);
    return () => Linking.removeListener('url', handleUrlEvent);
  }, []);
}
