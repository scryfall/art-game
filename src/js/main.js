import unorm from 'unorm';
import Vue from 'vue';
import { Scryfall } from './scryfall';

const KEY_LOCAL_THEME = 'theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

const EXCLUDES = [
  '-t:basic',
  '-t:saga',
  '-is:split',
  '-is:transform',
  '-is:fullart',
  '-is:extra'
];

const scryfall = new Scryfall();

function naturalize(str) {
  str = unorm.nfd(str).replace(/[\u0300-\u036f]/g, '');
  str = str.toLowerCase();
  str = str.replace(/[^\w\d]/gi, '');
  return str;
}

new Vue({
  el: '#app',
  data: {
    format: null,
    started: false,
    guess: '',
    darkTheme: true,
    loadingNextCard: false,
    card: { },
    artUrl: null,
    artToLoad: null,
    errorLoading: false,
    showFeedback: false,
    prevCard: null,
    prevGuess: null,
    prevGuessCorrect: null,
    score: 0,
  },
  created: function () {
    const theme = localStorage.getItem(KEY_LOCAL_THEME);
    if (theme === THEME_LIGHT) { this.darkTheme = false; }
    this.getNextCard('standard');
  },
  mounted: function () {
    this.$refs.standardBtn.focus();
  },
  methods: {
    start: function (format) {
      this.format = format;
      this.started = true;
      this.$nextTick(function() {
        this.focusGuessInput();
      });
    },
    focusGuessInput: function () {
      const guessInput = this.$refs.guessInput;
      setTimeout(function(){guessInput.focus();}, 1);
    },
    toggleTheme: function () {
      this.darkTheme = !this.darkTheme;
      localStorage.setItem(KEY_LOCAL_THEME, this.darkTheme ? THEME_DARK : THEME_LIGHT);
    },
    getNextCard: async function (format) {
      if (typeof format === 'undefined') {
        format = this.format;
      }
      this.loadingNextCard = true;
      try {
        this.card = await scryfall.getRandomCard(format, EXCLUDES);
        this.errorLoading = false;
        this.artToLoad = this.card.image_uris.art_crop;
      } catch (e) {
        console.error(`Failed to load a card for format ${format}`, e);
        this.errorLoading = true;
      }
    },
    imageFinishedLoading: function () {
      this.artUrl = this.artToLoad;
      this.loadingNextCard = false;
      this.focusGuessInput();
    },
    check: function () {
      const guessCorrect = naturalize(this.card.name) === naturalize(this.guess);
      if (guessCorrect) {
        this.score += 1;
      }
      this.prevGuessCorrect = guessCorrect;
      this.prevGuess = this.guess;
      this.prevCard = this.card;
      this.showFeedback = true;
      this.getNextCard();
      this.guess = '';
    },
    retry: function() {
      this.getNextCard();
    },
    skip: function() {
      this.getNextCard();
    }
  }
});
