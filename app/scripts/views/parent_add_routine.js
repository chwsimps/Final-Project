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

    AddRoutine: function (e, input_id, input_form, tod) {
      e.preventDefault();

      ar = new App.Models.Routine({
        routine: $(input_id).val(),
        time_of_day: tod,
        user: App.user
      });

      ar.setACL(new Parse.ACL(App.user));

      ar.save(null, {
        success: function () {
          App.tasks.add(ar);
          App.router.navigate('parent_routines', { trigger: true });
        }
      });

      $(input_form)[0].reset();
    },

    AddMorningRoutine: function (e) {
      this.AddRoutine(e, '#RoutineMorningInput', '#AddRoutineLeft', 'morning');
    },

    AddNightRoutine: function (e) {
      this.AddRoutine(e, '#RoutineNightInput', '#AddRoutineRight', 'night');
    }

  });

}());
