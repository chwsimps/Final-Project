(function () {

  App.Views.KidMorningRoutine = Parse.View.extend({

    // tagName: 'ul',

    className: 'KidMorningRoutines',

    events: {
      'click .start-button' : 'startChores',
      'click .next-button'  : 'nextChore'
    },

    template: _.template($('#start-routines').html()),

    initialize: function (options) {
      this.options = options;
      this.routine = 0;

      this.taskQuery();
      this.render_start();

      $('#MainSection').html(this.$el);

      var morning_time = new Parse.Query(App.Models.Time);
        morning_time.equalTo('user', App.user);
        morning_time.equalTo('time_of_day', 'morning');

      // morning_time = _.sortBy(this.collection, function (model) {
      //   return parseInt(model.test2);
      // });

      morning_time = 03;

      $(".start-button").click(function(){
        console.log(morning_time);
        var clock = $('.your-clock').FlipClock(morning_time, {
          countdown: true,
          clockFace: 'MinuteCounter',
          callbacks: {
            stop: function() {
              alert("Sorry! Time's Up!");
              $('.your-clock').empty();
              App.router.navigate('parent', { trigger: true });
            }
          }
        });
      });

    },

    startChores: function (e) {
      e.preventDefault();

      // Change view's template to routine template.
      this.template = _.template($('#next-routine').html());
      // Re-render the view.
      this.render_routine();
    },

    nextChore: function (e) {
      e.preventDefault();

      // Incrementing (bump) this.routine.
      this.routine = this.routine + 1;
      // Check if all routines are done. If this.routine == collection.length.
      if(this.routine === this.collection.length) {
        App.router.navigate('', { trigger: true });
      } else {
        this.render_routine();
      }
      // If they are all done -> // Navigate/Redirect to "routine board" view.
      // Else -> // Re-render.
    },

    taskQuery: function () {
      var self = this;

      var task_list = new Parse.Query(App.Models.Routine);
      task_list.equalTo('user', App.user);
      task_list.equalTo('time_of_day', 'morning');
      task_list.ascending('createdAt');

      task_list.find({
        success: function(results) {
          console.log(results);
          self.collection = results;
        }
      });
    },

    render_start: function () {
      var self = this;

      this.$el.empty();

      this.$el.html(this.template);
    },

    render_routine: function () {
      var self = this;

      this.$el.empty();

      var chore = this.collection[this.routine].toJSON();
      this.$el.html(this.template(chore));
    }

  });

}());
