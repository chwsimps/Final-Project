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

      $('.UserHeader').empty();

      var timer_morning = App.user.attributes.time_morning;

      $('.start-button').click(function () {
        console.log(App.user.attributes.time_morning);
        var clock = $('.your-clock').FlipClock(timer_morning, {
          countdown: true,
          clockFace: 'MinuteCounter',
          callbacks: {
            stop: function() {
              var alert = confirm("Time's Up! You'll Do It Next Time");
              $('.your-clock').empty();
              App.router.navigate('routine_board', { trigger: true });
              if(alert) {
                var start = (new Date().getDay());

                switch(start) {
                  case 0:
                    $('#starSun').html('<img src=' + App.user.attributes.fail_display + '/>');
                    break;
                  case 1:
                    $('#starMon').html('<img src=' + App.user.attributes.fail_display + '/>');
                    break;
                  case 2:
                    $('#starTue').html('<img src=' + App.user.attributes.fail_display + '/>');
                    break;
                  case 3:
                    $('#starWed').html('<img src=' + App.user.attributes.fail_display + '/>');
                    break;
                  case 4:
                    $('#starThu').html('<img src=' + App.user.attributes.fail_display + '/>');
                    break;
                  case 5:
                    $('#starFri').html('<img src=' + App.user.attributes.fail_display + '/>');
                    break;
                  case 6:
                    $('#starSat').html('<img src=' + App.user.attributes.fail_display + '/>');
                    break;
                }
              }
            }
          }
        });
      });

    },

    taskQuery: function () {
      var self = this;

      var task_list = new Parse.Query(App.Models.Routine);
      task_list.equalTo('user', App.user);
      task_list.equalTo('time_of_day', 'morning');
      task_list.ascending('createdAt');

      task_list.find({
        success: function(results) {
          // console.log(results);
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
        App.router.navigate('routine_board', { trigger: true });
      } else {
        this.render_routine();
      }
      // If they are all done -> // Navigate/Redirect to "routine board" view.
      // Else -> // Re-render.
    }

  });

}());
