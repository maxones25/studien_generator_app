export const isInstallable = () => {
    
  const details = navigator.userAgent;
  const regexp = /android|iphone|kindle|ipad/i;
  const isMobileDevice = regexp.test(details);

  if (!isMobileDevice)
      return false;
  if (window.matchMedia('(display-mode: standalone)').matches)
    return false;
  if (!('standalone' in window.navigator) || window.navigator.standalone)
    return false;

  return true;
}