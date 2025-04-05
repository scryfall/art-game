import Vue from "vue";
import { Scryfall } from "../utils/scryfall";
import {
  StorageKey,
  Theme,
  UniversalCriteria,
  Outcome,
  PresetFormatQueries,
} from "../models/criteria";

const scryfall = new Scryfall();

new Vue({
  el: "#app",
  data: {
    presetFormatQueries: PresetFormatQueries,
    theme: Theme.Dark,

    query: null,
    customQuery: "",
    score: 0,
    guess: "",
    loadingNextCard: false,
    card: {},
    artUrl: null,
    artToLoad: null,
    errorLoading: false,
    prevCard: null,
    prevGuess: null,
    prevOutcome: null,

    Outcome,
  },
  computed: {
    themeClass() {
      return `theme--${this.theme}`;
    },
    started() {
      return !!this.query;
    },
    showFeedback() {
      return !!this.prevCard;
    },
    answer() {
      return this.card.name;
    },
  },
  methods: {
    async start(query) {
      this.query = query;
      this.$nextTick(() => {
        this.focusGuessInput();
      });
      await this.getNextCard(this.query);
    },
    focusGuessInput() {
      const guessInput = this.$refs.guessInput;
      setTimeout(() => guessInput.focus(), 1);
    },
    toggleTheme() {
      this.theme = this.theme === Theme.Dark ? Theme.Light : Theme.Dark;
      localStorage.setItem(StorageKey.Theme, this.theme);
    },
    async getNextCard(query) {
      if (!query) query = this.query;
      this.loadingNextCard = true;
      try {
        const criteria = [].concat(UniversalCriteria);
        if (this.prevCard) criteria.push(`-!"${this.prevCard.name}"`);
        this.card = await scryfall.getRandomCard(query, criteria);
        this.errorLoading = false;
        this.artToLoad = this.card.artCropUri;
      } catch (e) {
        console.error(`Failed to load a card for query ${query}`, e);
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
      this.prevOutcome = correct ? Outcome.Correct : Outcome.Incorrect;
      this.prevGuess = this.guess;
      this.prevCard = this.card;
      this.getNextCard();
      this.guess = "";
    },
    retry() {
      this.getNextCard();
    },
    skip() {
      this.prevOutcome = Outcome.Skip;
      this.prevGuess = "";
      this.prevCard = this.card;
      this.getNextCard();
    },
  },
  created() {
    const storedTheme = localStorage.getItem(StorageKey.Theme);
    if (storedTheme) this.theme = storedTheme;
  },
  mounted() {
    this.$refs.formatButtons.firstElementChild.focus();
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value[0].toUpperCase() + value.slice(1);
    },
  },
});
