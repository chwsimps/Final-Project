(function () {

  App.Views.ParentRewardView = Parse.View.extend({

    className: 'ParentRewards',

    events: {
      'click #addWeeklyReward' : 'AddWeeklyReward',
      'click #addDailyReward' : 'AddDailyReward'
    },

    template: _.template($('#parent-rewards').html()),

    initialize: function () {
      $('#MainSection').html(this.$el);

      this.render();

      $('#setWeeklyReward').html(App.user.attributes.weekly_reward);
      $('#setDailyReward').html(App.user.attributes.daily_reward);
    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template);
    },

    AddWeeklyReward: function (e) {
      e.preventDefault();

      var weekly_reward = $('#weekly-reward').val();

      App.user.set('weekly_reward', weekly_reward);

      App.user.save();

      $('#setWeeklyReward').html(weekly_reward);

    },

    AddDailyReward: function (e) {
      e.preventDefault();

      var daily_reward = $('#daily-reward').val();

      App.user.set('daily_reward', daily_reward);

      App.user.save();

      $('#setDailyReward').html(daily_reward);

    }

  });

}());
