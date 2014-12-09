(function () {

  App.Views.KidRoutineBoard = Parse.View.extend({

    // tagName: 'ul'

    className: 'KidsRoutineBoard',

    events: {

    },

    template: _.template($('#kid-routine-board').html()),

    initialize: function () {
      $('#MainSection').html(this.$el);

      this.render();
    },

    render: function () {
      $('.your-clock').empty();

      this.$el.html(this.template);

      var start = new Date().toJSON().slice(0,10);

      console.log(start);

      $('#tuesday').html(App.user.attributes.daily_display);
    }

  });

}());
