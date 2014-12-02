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

    AddRoutine: function (e, input_id, input_form) {
      e.preventDefault();

      var amr = new App.Models.Routine({
        morning_routine: $(input_id).val(),
        user: App.user
      });

      amr.setACL(new Parse.ACL(App.user));

      amr.save(null, {
        success: function () {
          App.tasks.add(amr);
          App.router.navigate('parent_routines', { trigger: true });
        }
      });

      $(input_form)[0].reset();
    },

    AddMorningRoutine: function (e) {
      this.AddRoutine(e, '#RoutineMorningInput', '#AddRoutineLeft');
    },

    AddNightRoutine: function (e) {
      this.AddRoutine(e, '#RoutineNightInput', '#AddRoutineRight');

    }

  });

}());
