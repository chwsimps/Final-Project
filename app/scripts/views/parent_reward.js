(function () {

  App.Views.ParentRewardView = Parse.View.extend({

    className: 'ParentRewards',

    events: {

    },

    template: _.template($('#parent-rewards').html()),

    initialize: function () {
      this.render();

      $('#MainSection').html(this.$el);
    },

    render: function () {
      this.$el.empty();

      this.$el.html($('#parent-rewards').html());
    },

  });

}());
