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

    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template);

    },

    AddTime: function (e, input_id, input_form, tod) {
      e.preventDefault();

      at = new App.Models.Time({
        timing: parseInt($(input_id).val()*60),
        time_of_day: tod,
        user: App.user
      });

      $(input_id).hide();

      at.setACL(new Parse.ACL(App.user));

      at.save(null, {
        success: function () {
          App.times.add(at);
          App.router.navigate('parent_timing', { trigger: true });
        },
        error: function (obj, e) {
          console.log('Shit went wrong! ' + e.message);
        }
      });

      //
      // location.reload();

    },

    AddMorningTime: function (e) {
      this.AddTime(e, '#TimingMorningInput', '#AddTimeLeft', 'morning');
      // $('#AddMorningTime').text('Locked In');
      $.cookie($('#AddMorningTime').text('Locked In'));
    },

    AddNightTime: function (e) {
      this.AddTime(e, '#TimingNightInput', '#AddTimeRight', 'night');
      $('#AddNightTime').text('Locked In');
    }

  });

}());
