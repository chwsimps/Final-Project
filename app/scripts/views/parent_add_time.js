(function () {

  App.Views.ParentAddTime = Parse.View.extend({

    className: 'ParentTiming',

    events: {
      'submit #AddTimeLeft' : 'AddMorningTime',
      'submit #AddTimeRight' : 'AddNightTime'
    },

    template: _.template($('#parent-timing').html()),

    initialize: function () {
      $('#MainSection').html(this.$el);

      this.render();
    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template);

      $('#setTime').html(App.user.attributes.time_morning/60 + " Minutes");
      $('#setTimeNight').html(App.user.attributes.time_night/60 + " Minutes");
    },

    AddMorningTime: function (e) {
      e.preventDefault();

      var time_morning = parseInt($('#TimingMorningInput').val()*60);

      // console.log(time_morning);

      App.user.set('time_morning', time_morning);

      App.user.save();

      $('#setTime').html(time_morning/60 + " Minutes");

      $('#AddMorningTime').text('Locked In');
    },

    AddNightTime: function (e) {
      e.preventDefault();

      var time_night = parseInt($('#TimingNightInput').val()*60);

      App.user.set('time_night', time_night);

      App.user.save();

      $('#setTimeNight').html(time_night/60 + " Minutes");

      $('#AddNightTime').text('Locked In');
    }

  });

}());
