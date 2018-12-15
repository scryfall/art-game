const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const ENV_DEV = 'development'
const ENV_PROD = 'production';
const ENV = process.env.NODE_ENV || ENV_DEV;

const CONTENT_SECURITY_POLICY = [
  "default-src *.scryfall.com",
  "script-src *.scryfall.com 'unsafe-eval'",
  "style-src *.scryfall.com",
  "img-src *.scryfall.com data:",
  "block-all-mixed-content"
].join('; ');

express()
  .use(express.static(path.join(__dirname, 'dist'), {
    setHeaders: (res, path, stat) => {
      let policyHeader = 'Content-Security-Policy';
      if (ENV === ENV_DEV) {
        policyHeader = 'Content-Security-Policy-Report-Only';
      }
      res.set(policyHeader, CONTENT_SECURITY_POLICY)
      res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
      res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.set('X-Frame-Options', 'DENY');
      res.set('X-Permitted-Cross-Domain-Policies', 'none');
      res.set('X-XSS-Protection', '1; mode=block');
      res.set('X-Download-Options', 'noopen');
    }
  }))
  .listen(PORT, () => console.log(`Listening on port ${PORT} at directory ${__dirname}`));
