(function () {
  const app = new Vue({
    el: '#app',
    data: {
      format: null,
      started: false,
      guess: 'Lorem ipsum',
      card: { },

    },
    mounted: function() {
      this.$refs.standardBtn.focus();
    },
    methods: {
      start: function (format) {
        this.format = format;
        this.started = true;
      }
    }
  });

  // dev purposes
  app.start('standard');
})();
