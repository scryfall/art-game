(function () {
  const KEY_LOCAL_THEME = 'theme';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';

  const app = new Vue({
    el: '#app',
    data: {
      format: null,
      started: false,
      guess: '',
      darkTheme: true,
      card: { },
    },
    created: function () {
      const theme = localStorage.getItem(KEY_LOCAL_THEME);
      if (theme === THEME_LIGHT) { this.darkTheme = false; }
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
      }
    }
  });

  // dev purposes
  // app.start('standard');
})();
