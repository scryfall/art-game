const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

express()
  .use('/', express.static(__dirname))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
