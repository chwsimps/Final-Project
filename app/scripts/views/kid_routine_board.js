(function () {

  App.Views.KidRoutineBoard = Parse.View.extend({

    // tagName: 'ul'

    className: 'KidsRoutineBoard',

    events: {
      'click .next-button' : 'AddDailyIcon'

    },

    template: _.template($('#kid-routine-board').html()),

    initialize: function () {
      $('#MainSection').html(this.$el);

      this.render();
    },

    render: function () {
      $('.your-clock').empty();

      this.$el.html(this.template);

      $('#tuesday').html(App.user.attributes.daily_display);
    },

    AddDailyIcon: function (e) {
      e.preventDefault();

      var daily_display = App.user.attributes.daily_display;

      // console.log(daily_display);

      App.user.set('daily_display', daily_display);

      App.user.save();
    }

  });

}());
