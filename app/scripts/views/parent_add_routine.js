(function () {

  App.Views.ParentAddRoutine = Parse.View.extend({

    className: 'ParentAddRoutines',

    events: {
      'click #AddMorningRoutine' : 'AddMorningRoutine',
      'click #AddNightRoutine' : 'AddNightRoutine'
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

      $('#AddRoutineLeft')[0].reset();

    },

    AddNightRoutine: function (e) {
      e.preventDefault();

      var anr = new App.Models.Routine({
        night_routine: $('#RoutineNightInput').val(),
        user: App.user
      });

      anr.setACL(new Parse.ACL(App.user));

      anr.save(null, {
        success: function () {
          App.tasks.add(anr);
          App.router.navigate('parent_routines', { trigger: true });
        }
      });

      $('#AddRoutineRight')[0].reset();

    }

  });

}());
