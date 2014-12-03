(function () {

  App.Views.ParentViewRoutine = Parse.View.extend({

    tagName: 'ul',

    className: 'ParentViewRoutines',

    events: {},

    template: _.template($('#parent-view-routines').html()),

    initialize: function (options) {
      this.options = options;

      // this.collection.off();
      this.collection.on('sync', this.taskQuery, this);

      $('#ListSection').html(this.$el);

      this.taskQuery();
    },

    taskQuery: function () {
      var self = this;

      var task_list = new Parse.Query(App.Models.Routine);
      task_list.equalTo('user', App.user);
      task_list.find({
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
