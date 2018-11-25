(function () {
  const app = new Vue({
    el: '#app',
    data: {
      format: null,
      started: false,
    },
    methods: {
      start: function (format) {
        this.format = format;
        this.started = true;
      }
    }
  });
})();
