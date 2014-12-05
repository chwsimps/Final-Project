(function () {

  App.Views.ParentAddTime = Parse.View.extend({

    className: 'ParentTiming',

    events: {
      'submit #AddTimeLeft' : 'AddMorningTime',
      'submit #AddTimeRight' : 'AddNightTime'
    },

    template: _.template($('#parent-timing').html()),

    initialize: function () {
      this.render();

      $('#MainSection').html(this.$el);

      $('#AddTimeLeft').on('submit', function (e) {
        e.preventDefault();

        $('#TimingMorningInput').hide();
        $('#AddMorningTime').text('Locked In');
      });
    },

    render: function () {
      this.$el.empty();

      this.$el.html($('#parent-timing').html());

    },

    AddTime: function (e, input_id, input_form, tod) {
      e.preventDefault();

      at = new App.Models.Time({
        timing: parseInt($(input_id).val()),
        time_of_day: tod,
        user: App.user
      });

      at.setACL(new Parse.ACL(App.user));

      at.save(null, {
        success: function () {
          App.tasks.add(at);
          App.router.navigate('parent_timing', { trigger: true });
        }
      });

      // $(input_form)[0].reset();
      //
      // location.reload();
    },

    AddMorningTime: function (e) {
      this.AddTime(e, '#TimingMorningInput', '#AddTimeLeft', 'morning');

    },

    AddNightTime: function (e) {
      this.AddTime(e, '#TimingNightInput', '#AddTimeRight', 'night');
    }

  });

}());
