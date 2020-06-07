# Scryfall Art Game

A game for guessing card names based on their art.

## Setup:

1. Install [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) latest
2. Run `npm install`

## Development

Install Gulp CLI globally if you're interested in developing (`npm i -g gulp-cli`)

* Run a local development server: `gulp` (or `gulp serve`)
* Create a development build: `gulp build`
* Lint: `gulp lint`
* Run unit tests: `npm test`

The development server uses [browsersync](https://www.browsersync.io/) to show any code changes live, reloading the page as needed. It will automatically create a build as part of starting.

Create a production build, or run the local server with production code, by appending the `--prod` argument to the above commands.

If linting fails, the build fails.

## Using the Express server

This project includes a lightweight [Express](https://expressjs.com/) server at [`index.js`](index.js) which serves the project in production.

You can run this server locally using `npm start`.

This server depends on already having a build generated. As part of installing the project, a production build will already be present in this directory, so you can run this immediately. Otherwise you can generate a build as follows:

* Development build: `gulp build`
* Production build: `npm build` or `gulp build --prod`

## Deployment

Deploy this project via Heroku.

## Other project info

This is a Vue 2 SPA.

We use Jest for unit testing. You'll see we import the jest globals we use: this is optional but it adds intellisense information.

Baseline requirements:

* Browser targets: IE11+, edge Chrome, Firefox, Safari (incl. iOS)
* A static site powered fully by JS and the public API at https://scryfall.com/docs/api/cards/random
* Minimise usage of cookies or localstorage.
* Responsive down to 320px.
* No CDNs beside this project's own asset CDN and img.scryfall.com
* Keep within Scryfall brand colors (defined in [`_colors.scss`](src/scss/_colors.scss))
