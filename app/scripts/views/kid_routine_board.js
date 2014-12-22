(function () {

  App.Views.KidRoutineBoard = Parse.View.extend({

    // tagName: 'ul'

    className: 'KidsRoutineBoard',

    events: {},

    template: _.template($('#kid-routine-board').html()),

    initialize: function () {
      $('#MainSection').html(this.$el);

      this.render();

      $('.phoneHome').click(function () {
        $('#logOut, #ParentViewBtn').show();
      });

    },

    render: function () {
      $('.your-clock').empty();

      // clearInterval(App.timerNext);

      App.clock.stop();

      this.$el.html(this.template);

      var start = (new Date().getDay());

      switch(start) {
        case 0:
          $('#starSun').html('<img src=' + App.user.attributes.daily_reward + '/>');
          break;
        case 1:
          $('#starMon').html('<img src=' + App.user.attributes.daily_reward + '/>');
          break;
        case 2:
          $('#starTue').html('<img src=' + App.user.attributes.daily_reward + '/>');
          break;
        case 3:
          $('#starWed').html('<img src=' + App.user.attributes.daily_reward + '/>');
          break;
        case 4:
          $('#starThu').html('<img src=' + App.user.attributes.daily_reward + '/>');
          break;
        case 5:
          $('#starFri').html('<img src=' + App.user.attributes.daily_reward + '/>');
          break;
        case 6:
          $('#starSat').html('<img src=' + App.user.attributes.daily_reward + '/>');
          break;
      }

      var reward_weekly = App.user.attributes.weekly_reward;
      // console.log(reward_weekly);
      var img = '<img src="' + App.user.attributes.weekly_reward + '" />';
      $('#reward').html(img);

    }

  });

}());
