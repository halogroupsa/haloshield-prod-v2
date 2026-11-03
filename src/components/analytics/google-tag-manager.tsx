import { GTM_ID, PRODUCTION_HOST } from "@/lib/deployment";

/**
 * Keep Google's bootstrap in the exported HTML, with an exact runtime host
 * check so even a production artifact served on a preview host cannot track.
 * A noscript iframe cannot perform that check in a shared static export; it
 * is deliberately omitted to keep analytics restricted to production.
 * Configure GA4, Ads and other destinations inside this GTM container.
 */
export function GoogleTagManager() {
  return (
    <script
      id="gtm-init"
      dangerouslySetInnerHTML={{
        __html: `if(location.hostname===${JSON.stringify(PRODUCTION_HOST)}&&location.protocol==='https:'&&!window.__haloGtmLoaded){window.__haloGtmLoaded=true;(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(GTM_ID)});}`,
      }}
    />
  );
}
