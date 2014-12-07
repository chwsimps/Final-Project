(function () {

App.Views.ParentAddRoutine = Parse.View.extend({

    className: 'ParentAddRoutines',

    events: {
      'submit #AddRoutineLeft' : 'AddMorningRoutine',
      'submit #AddRoutineRight' : 'AddNightRoutine'
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
        // timing: parseInt($(timing_id).val()),
        time_of_day: tod,
        user: App.user
      });

      console.log(ar);

      ar.setACL(new Parse.ACL(App.user));

      ar.save(null, {
        success: function () {
          App.tasks.add(ar);
          App.router.navigate('parent_routines', { trigger: true });
        },
        error: function (obj, e) {
          console.log('stuff blew up! ' + e.message);
        }
      });

      $(input_form)[0].reset();

      location.reload();
    },

    AddMorningRoutine: function (e) {
      this.AddRoutine(e, '#RoutineMorningInput', '#AddRoutineLeft', 'morning');
    },

    AddNightRoutine: function (e) {
      this.AddRoutine(e, '#RoutineNightInput', '#AddRoutineRight', 'night');
    }

  });

}());
