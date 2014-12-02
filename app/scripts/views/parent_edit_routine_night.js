(function () {

  App.Views.ParentEditRoutineNight = Parse.View.extend({

    tagName: 'ul',

    className: 'editRoutinesNight',

    events: {
      'submit #edit-night-list' : 'EditRoutineNight'
    },

    template: _.template($('#parent-edit-routines-night').html()),

    initialize: function (options) {
      this.options = options;

      this.render();

      $('#ListSection2').html(this.$el);
    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template(this.options.task.toJSON()));
    },

    EditRoutineNight: function (e) {
      e.preventDefault();

      this.options.task.set({
        routine: $('#edit_moni').val()
      });

      this.options.task.save();

      App.router.navigate('parent_routines', { trigger: true});
    }

  });

}());
