(function () {

  App.Views.KidRoutineBoard = Parse.View.extend({

    // tagName: 'ul'

    className: 'KidsRoutineBoard',

    events: {},

    template: _.template($('#kid-routine-board').html()),

    initialize: function () {
      this.render();

      $('#MainSection').html(this.$el);
    },

    render: function () {
      $('.your-clock').empty();

      this.$el.html(this.template);
    }

  });

}());
