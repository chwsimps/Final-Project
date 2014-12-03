(function () {

  App.Views.KidMorningRoutine = Parse.View.extend({

    // tagName: 'ul',

    className: 'KidMorningRoutines',

    events: {

    },

    template: _.template($('#kid-morning-routines').html()),

    initialize: function (options) {
      this.options = options;

      this.render();

      $('#MainSection').html(this.$el);
    },

    render: function () {
      var self = this;

      this.$el.empty();

      this.$el.html($('#kid-morning-routines').html());
    }

  });

}());
