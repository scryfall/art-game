# Scryfall Art Game

A game for guessing card names based on their art.

## Setup:

1. Install [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) latest
2. Run `npm install`

## Development

Install Gulp CLI globally if you're interested in developing (`npm i -g gulp-cli`)

* Dev server: `gulp` (or `gulp serve`)
* Dev build: `gulp build`
* Lint: `gulp lint`

Run a production build or server by appending the `--prod` argument.

This project includes a lightweight [Express](https://expressjs.com/) server at `index.js` which is used in production. You can also run this server locally using `npm start`.

This is a Vue 2 SPA.

**Browser targets:** IE11+, edge Chrome, Firefox, Safari (incl. iOS)
