(function () {

  App.Views.ParentEditRoutine = Parse.View.extend({

    tagName: 'ul',

    className: 'editRoutines',

    events: {
      'submit #edit-morning-list' : 'EditRoutine',
      'click #deleteMoTask' : 'DeleteTask'
    },

    template: _.template($('#parent-edit-routines').html()),

    initialize: function (options) {
      this.options = options;

      this.render();

      $('#ListSection').html(this.$el);
    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template(this.options.task.toJSON()));
    },

    EditRoutine: function (e) {
      e.preventDefault();

      this.options.task.set({
        routine: $('#edit_moro').val()
      });

      this.options.task.save();

      App.router.navigate('parent_routines', { trigger: true});
    },

    DeleteTask: function(e) {
      e.preventDefault();

      this.options.task.destroy();

      App.router.navigate('parent_routines', { trigger: true});
    }

  });

}());
