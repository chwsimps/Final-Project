(function () {

  App.Views.ParentTimeViewNight = Parse.View.extend({

    className: 'ParentViewTime2',

    events: {},

    template: _.template($('#parent-view-time-night').html()),

    initialize: function (options) {
      this.options = options;

      $('#ListSection2').html(this.$el);

      this.timeQuery();
    },

    timeQuery: function () {
      var self = this;

      var time_list = new Parse.Query(App.Models.Time);
      time_list.equalTo('user', App.user);
      time_list.ascending('createdAt');
      time_list.limit({
        success: function () {

        },
        error: function(error) {
          alert("Error: " + error.message);
        }
      });

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
