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

      // console.log(start);

      if($('next-button').click()) {
        console.log('Too Slow');
      } else {
        console.log('Got a Star');
      }

      switch(start) {
        case 0:
          $('#sunday').html(App.user.attributes.daily_display);
          break;
        case 1:
          $('#monday').html(App.user.attributes.daily_display);
          break;
        case 2:
          $('#tuesday').html(App.user.attributes.daily_display);
          break;
        case 3:
          $('#wednesday').html(App.user.attributes.daily_display);
          break;
        case 4:
          $('#thursday').html(App.user.attributes.daily_display);
          break;
        case 5:
          $('#friday').html(App.user.attributes.daily_display);
          break;
        case 6:
          $('#saturday').html(App.user.attributes.daily_display);
          break;
        default:
          console.log('default');
      }

      var reward_weekly = App.user.attributes.weekly_reward;
      // console.log(reward_weekly);
      $('#reward').html(App.user.attributes.weekly_reward);

    }

  });

}());
