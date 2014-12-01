(function () {

  App.Views.ParentRoutineView = Parse.View.extend({

    tagName: 'ul',

    className: 'ParentRoutine',

    events: {

    },

    template: _.template($('#parent-routines').html()),

    initialize: function () {
      this.render();

      $('#MainSection').html(this.$el);
    },

    render: function () {
      this.$el.html(this.template);
    }

  });

}());
