(function () {

  App.Views.ParentTimeView = Parse.View.extend({

    className: 'ParentViewTime',

    events: {},

    template: _.template($('#parent-view-time').html()),

    initialize: function (options) {
      this.options = options;

      // Query Parse for App.Models.Time equalTo currentUser
      // Maybe set this.morning_timer and this.night_timer to keep the data
      // easily available.

      // If a timer is present:
      //   Render a "locked in" template
      // Else:
      //   Render the current "AddTime" template

      $('#ListSection').html(this.$el);

      this.timeQuery();
    },

    timeQuery: function () {
      var self = this;

      var time_list = new Parse.Query(App.Models.Time);
      time_list.equalTo('user', App.user);

      time_list.find({
        success: function(results) {
          self.collection = results;
          console.log(results);
          self.render();
        }
      });
    },

    render: function () {
      var self = this;

      this.$el.empty();

      var local_collection = this.collection;

      _.each(local_collection, function (t) {
        self.$el.append(self.template(t.toJSON()));
      });

      return this;
    }

  });

}());
