import Vue from 'vue';
import { Scryfall } from './scryfall';
import { StorageKey, Theme, UniversalCriteria } from './config';

const scryfall = new Scryfall();

const supportedFormats = [
  'standard',
  'pioneer',
  'modern',
  'vintage'
];

new Vue({
  el: '#app',
  data: {
    supportedFormats,
    theme: Theme.Dark,
    format: null,
    guess: '',
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
  computed: {
    themeClass() {
      return `theme--${this.theme}`;
    },
    started() {
      return !!this.format;
    }
  },
  methods: {
    start(format) {
      this.format = format;
      this.$nextTick(() => {
        this.focusGuessInput();
      });
    },
    focusGuessInput() {
      const guessInput = this.$refs.guessInput;
      setTimeout(() => guessInput.focus(), 1);
    },
    toggleTheme() {
      this.theme = this.theme === Theme.Dark ? Theme.Light : Theme.Dark;
      localStorage.setItem(StorageKey.Theme, this.theme);
    },
    async getNextCard(format) {
      if (!format) format = this.format;
      this.loadingNextCard = true;
      try {
        const criteria = [].concat(UniversalCriteria);
        if (this.prevCard) criteria.push(`-!"${this.prevCard.name}"`);
        this.card = await scryfall.getRandomCard(format, criteria);
        this.errorLoading = false;
        this.artToLoad = this.card.artCropUri;
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
      const correct = this.card.guessName(this.guess);
      if (correct) this.score += 1;
      this.prevGuessCorrect = correct;
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
  },
  created() {
    const storedTheme = localStorage.getItem(StorageKey.Theme);
    if (storedTheme) this.theme = storedTheme;
    this.getNextCard('standard');
  },
  mounted() {
    this.$refs.formatButtons.firstElementChild.focus();
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value[0].toUpperCase() + value.slice(1);
    }
  }
});
