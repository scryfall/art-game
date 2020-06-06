import unorm from 'unorm';
import Vue from 'vue';
import { Scryfall } from './scryfall';
import { StorageKey, Theme, UniversalExcludes } from './config';

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
  created() {
    const theme = localStorage.getItem(StorageKey.Theme);
    if (theme === Theme.Light) { this.darkTheme = false; }
    this.getNextCard('standard');
  },
  mounted() {
    this.$refs.standardBtn.focus();
  },
  methods: {
    start(format) {
      this.format = format;
      this.started = true;
      this.$nextTick(() => {
        this.focusGuessInput();
      });
    },
    focusGuessInput() {
      const guessInput = this.$refs.guessInput;
      setTimeout(() => guessInput.focus(), 1);
    },
    toggleTheme() {
      this.darkTheme = !this.darkTheme;
      localStorage.setItem(StorageKey.Theme, this.darkTheme ? Theme.Dark : Theme.Light);
    },
    async getNextCard(format) {
      if (typeof format === 'undefined') {
        format = this.format;
      }
      this.loadingNextCard = true;
      try {
        this.card = await scryfall.getRandomCard(format, UniversalExcludes);
        this.errorLoading = false;
        this.artToLoad = this.card.image_uris.art_crop;
      } catch (e) {
        console.error(`Failed to load a card for format ${format}`, e);
        this.errorLoading = true;
      }
    },
    imageFinishedLoading() {
      this.artUrl = this.artToLoad;
      this.loadingNextCard = false;
      this.focusGuessInput();
    },
    check() {
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
    retry() {
      this.getNextCard();
    },
    skip() {
      this.getNextCard();
    }
  }
});
