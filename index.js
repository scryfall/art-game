const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

express()
  .use(express.static(path.join(__dirname, 'dist'), {
    setHeaders: (res, path, stat) => {
      res.set('Content-Security-Policy-Report-Only', "default-src 'self' *.scryfall.com scryfall-art-game.herokuapp.com")
      res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
      res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.set('X-Frame-Options', 'DENY');
      res.set('X-Permitted-Cross-Domain-Policies', 'none');
      res.set('X-XSS-Protection', '1; mode=block');
      res.set('X-Download-Options', 'noopen');
    }
  }))
  .listen(PORT, () => console.log(`Listening on port ${PORT} at directory ${__dirname}`));
