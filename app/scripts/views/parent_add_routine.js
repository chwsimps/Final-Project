(function () {

  App.Views.ParentAddRoutine = Parse.View.extend({

    className: 'ParentAddRoutines',

    events: {
      'click #AddMorningRoutine' : 'AddMorningRoutine'
    },

    template: _.template($('#parent-add-routines').html()),

    initialize: function () {
      this.render();

      $('#MainSection').html(this.$el);
    },

    render: function () {
      this.$el.empty();

      this.$el.html($('#parent-add-routines').html());
    },

    AddMorningRoutine: function (e) {
      e.preventDefault();

      var amr = new App.Models.Routine({
        morning_routine: $('#RoutineMorningInput').val(),
        user: App.user
      });

      amr.setACL(new Parse.ACL(App.user));

      amr.save(null, {
        success: function () {
          App.tasks.add(amr);
          App.router.navigate('parent_routines', { trigger: true });
        }
      });

      $('#AddRoutine')[0].reset();

    }

  });

}());
