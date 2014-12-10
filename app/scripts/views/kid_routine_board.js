(function () {

  App.Views.KidRoutineBoard = Parse.View.extend({

    // tagName: 'ul'

    className: 'KidsRoutineBoard',

    events: {},

    template: _.template($('#kid-routine-board').html()),

    initialize: function () {
      $('#MainSection').html(this.$el);

      this.render();
    },

    render: function () {
      $('.your-clock').empty();

      this.$el.html(this.template);

      var start = (new Date().getDay());

      switch(start) {
        case 0:
          $('#starSun').html(App.user.attributes.daily_display);
          break;
        case 1:
          $('#starMon').html(App.user.attributes.daily_display);
          break;
        case 2:
          $('#starTue').html(App.user.attributes.daily_display);
          break;
        case 3:
          $('#starWed').html(App.user.attributes.daily_display);
          break;
        case 4:
          $('#starThu').html(App.user.attributes.daily_display);
          break;
        case 5:
          $('#starFri').html(App.user.attributes.daily_display);
          break;
        case 6:
          $('#starSat').html(App.user.attributes.daily_display);
          break;
      }

      var reward_weekly = App.user.attributes.weekly_reward;
      // console.log(reward_weekly);
      $('#reward').html(App.user.attributes.weekly_reward);

    }

  });

}());
