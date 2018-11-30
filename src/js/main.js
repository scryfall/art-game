(function () {
  const KEY_LOCAL_THEME = 'theme';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';

  const EXCLUDES = [
    't:basic',
    't:saga',
    'is:split',
    'is:transform',
    'is:fullart',
    'is:extra'
  ];

  function naturalize(str) {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.toLowerCase();
    str = str.replace(/[^\w\d]/gi, '');
    return str;
  }

  function get(url, resolve, reject) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        resolve(data);
      } else {
        reject(request.responseText);
      }
    };

    request.onerror = function() {
      reject(request.statusText);
    };

    request.send();
  }

  /**
   * Get a random card from the Random API.
   * @param {string} format The format to pick from: 'standard', 'modern', or 'vintage'
   */
  function getRandomCard(format, resolve, reject) {
    const endpoint = 'https://api.scryfall.com/cards/random';
    const queryExcludes = EXCLUDES.map(function (str) {
      return '-' + str;
    }).join(' ');
    const queryFormat = 'f:' + format;
    const query = queryFormat + ' ' + queryExcludes;
    const url = endpoint + '?q=' + query;
    return get(url, resolve, reject);
  }

  const app = new Vue({
    el: '#app',
    data: {
      format: null,
      started: false,
      guess: '',
      darkTheme: true,
      loadingNextCard: false,
      card: { },
      errorLoading: false,
      showFeedback: false,
      prevCard: null,
      prevGuess: null,
      prevGuessCorrect: null,
      score: 0,
    },
    computed: {
      artUrl: function () {
        if (typeof this.card.image_uris === 'undefined') {
          return false;
        }
        return this.card.image_uris.art_crop;
      }
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
        this.$refs.guessInput.focus();
      },
      toggleTheme: function () {
        this.darkTheme = !this.darkTheme;
        localStorage.setItem(KEY_LOCAL_THEME, this.darkTheme ? THEME_DARK : THEME_LIGHT);
      },
      getNextCard: function (format) {
        if (typeof format === 'undefined') {
          format = this.format;
        }
        this.loadingNextCard = true;
        getRandomCard(format, function(card) {
          this.errorLoading = false;
          this.card = card;
        }.bind(this),
        function (error) {
          this.errorLoading = true;
        }.bind(this));
      },
      imageFinishedLoading: function () {
        this.loadingNextCard = false;
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

  // dev purposes
  // app.start('standard');
  window.app = app;
})();
