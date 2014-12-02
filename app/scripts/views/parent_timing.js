(function () {

  App.Views.ParentTimingView = Parse.View.extend({

    className: 'ParentTiming',

    events: {

    },

    template: _.template($('#parent-timing').html()),

    initialize: function () {
      this.render();

      $('#MainSection').html(this.$el);

      // function outputUpdate(vol) {
      //   document.getElementById('#volume').value = vol;
      // };
    },

    render: function () {
      this.$el.empty();

      this.$el.html($('#parent-timing').html());
    },

  });

}());
