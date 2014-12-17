(function () {

  App.Models.Routine = Parse.Object.extend({

    className: 'Routine',
    idAttribute: 'objectId',

    defaults: {
      time_of_day: '',
      routine: '',
      reward_daily: '',
      reward_weekly: '',
      user: ''
    },

    initialize: function (){

    }

  });

}());

(function () {

  App.Models.Time = Parse.Object.extend({

    className: 'Countdown',
    idAttribute: 'objectId',

    defaults: {
      time_of_day: '',
      timing: 0,
      user: ''
    },

    initialize: function (){

    }

  });

}());

(function () {

  App.Collections.Routines = Parse.Collection.extend ({
    model: App.Models.Routine
  });

}());

(function () {

  App.Collections.Times = Parse.Collection.extend ({
    model: App.Models.Time
  });

}());

(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    routes: {

      '' : 'home',
      'signup' : 'userSignUp',
      'login' : 'userLogin',
      'parent' : 'parentMain',
      'parent_routines' : 'AddRoutine',
      'parent_rewards' : 'AddRewards',
      'parent_timing' : 'AddTimeSetUp',
      'parent_charts' : 'ViewCharts',
      'edit_morning/:taskID' : 'EditRoutine',
      'edit_night/:taskID' : 'EditRoutineNight',
      'morning_routines' : 'RunMorningRoutines',
      'night_routines' : 'RunNightRoutines',
      'routine_board' : 'DisplayRoutineBoard'
    },

    home: function () {

      new App.Views.MainHomeView();
    },

    userSignUp: function () {
      if(App.user) return App.router.navigate('', { trigger: true});

      new App.Views.SignUpView();

    },

    userLogin: function () {
      if(App.user) return App.router.navigate('', { trigger: true});

      new App.Views.LoginView();
    },

    parentMain: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.ParentHomeView();
    },

    AddRoutine: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.ParentAddRoutine();

      new App.Views.ParentViewRoutine({ collection: App.tasks });
      new App.Views.ParentViewRoutineNight({ collection: App.tasks });
    },

    AddRewards: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.ParentRewardView();
    },

    AddTimeSetUp: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.ParentAddTime();

      new App.Views.ParentTimeView();
      new App.Views.ParentTimeViewNight();
    },

    EditRoutine: function (taskID) {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      var t = App.tasks.get(taskID);
      new App.Views.ParentEditRoutine({ task: t });
    },

    EditRoutineNight: function (taskID) {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      var t = App.tasks.get(taskID);
      new App.Views.ParentEditRoutineNight({ task: t });
    },

    RunMorningRoutines: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.KidMorningRoutine({ collection: App.tasks });
    },

    RunNightRoutines: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.KidNightRoutine({ collection: App.tasks });
    },

    DisplayRoutineBoard: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.KidRoutineBoard();
    },

    ViewCharts: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.ParentChartView();
    }

  });

}());

(function () {

  App.Views.LoginView = Parse.View.extend({

    className: 'loggingIn',

    events: {
      'submit #Login' : 'userLogin'
    },

    template:  _.template($('#user-login').html()),

    initialize: function () {
      this.render();

      $('#LoginSection').html(this.$el);
    },

    render: function () {
      this.$el.html(this.template);
    },

    userLogin: function (e) {
      e.preventDefault();

      var username = $('#userName').val();
      var password = $('#password').val();
      // var email = $('#userEmail').val();

      Parse.User.logIn(username, password, {
        success: function (user) {
          App.updateUser();
          App.router.navigate('', { trigger: true });
        },

        error: function (user, error) {
          alert("Error: " + error.message);
        }
      });

      $('#LoginSection').empty();
    }

  });

}());

(function () {

  App.Views.SignUpView = Parse.View.extend({

    className: 'signingUp',

    events: {
      'submit #SignUp' : 'userSignUp'
    },

    template: _.template($('#user-signup').html()),

    initialize: function () {
      this.render();

      $('#LoginSection').html(this.$el);
    },

    render: function () {
      this.$el.html(this.template);
    },

    userSignUp: function (e) {
      e.preventDefault();

    var user = new Parse.User({
      username: $("#signupName").val(),
      password: $("#signupPassword").val(),
      avatar: 'http://icons.iconarchive.com/icons/adorabletoon/people/64/astronaut-icon.png',
      email: $("#signupEmail").val(),
      time_morning: 1800,
      time_night: 1800,
      daily_display: 'http://icons.iconarchive.com/icons/gpritiranjan/simple-christmas/64/star-icon.png',
      fail_display: 'http://icons.iconarchive.com/icons/mathijssen/tuxlets/64/Sad-Tux-icon.png',
      daily_reward: 'Add Daily Reward',
      weekly_reward: 'Add Weekly Reward'
      });

      // user.signUp();

      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
          App.updateUser();
          App.router.navigate('', { trigger: true });
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.message);
        }
      });

      $('#LoginSection').empty();
    }

  });

}());

(function () {

  App.Views.MainHomeView = Parse.View.extend({

    className: 'MainHome',

    events: {
      'click .MorningRoutineMP' : 'MorningRoutineMP',
      'click .NightRoutineMP' : 'NightRoutineMP'
    },

    template: _.template($('#home-page').html()),

    initialize: function () {
      this.render();

      $('#MainSection').html(this.$el);
    },

    render: function () {

      $('body').removeClass('sunrise');
      $('body').removeClass('moontime');
      $('#ListSection').empty();
      $('#ListSection2').empty();
      $('.your-clock').empty();

      this.$el.html(this.template);

    },

    MorningRoutineMP: function (e) {
      e.preventDefault();

      $('body').addClass('sunrise');

      App.router.navigate('morning_routines', { trigger: true });
    },

    NightRoutineMP: function (e) {
      e.preventDefault();

      $('body').addClass('moontime');

      App.router.navigate('night_routines', { trigger: true });
    }

  });

}());

(function () {

  App.Views.ParentHomeView = Parse.View.extend({

    className: 'ParentHome',

    events: {},

    template: _.template($('#parent-mainPage').html()),

    initialize: function () {
      this.render();

      $('#MainSection').html(this.$el);
    },

    render: function () {
      $('#ListSection').empty();
      $('#ListSection2').empty();
      $('.your-clock').empty();
      this.$el.html(this.template);
    }

  });

}());

(function () {

App.Views.ParentAddRoutine = Parse.View.extend({

    className: 'ParentAddRoutines',

    events: {
      'submit #AddRoutineLeft' : 'AddMorningRoutine',
      'submit #AddRoutineRight' : 'AddNightRoutine'
    },

    template: _.template($('#parent-add-routines').html()),

    initialize: function () {
      this.render();

      $('#MainSection').html(this.$el);
    },

    render: function () {
      this.$el.empty();

      this.$el.html($('#parent-add-routines').html());
    },

    AddRoutine: function (e, input_id, input_form, tod) {
      e.preventDefault();

      ar = new App.Models.Routine({
        routine: $(input_id).val(),
        // timing: parseInt($(timing_id).val()),
        time_of_day: tod,
        user: App.user
      });

      console.log(ar);

      ar.setACL(new Parse.ACL(App.user));

      ar.save(null, {
        success: function () {
          App.tasks.add(ar);
          App.router.navigate('parent_routines', { trigger: true });
        },
        error: function (obj, e) {
          console.log('stuff blew up! ' + e.message);
        }
      });

      $(input_form)[0].reset();

      location.reload();
    },

    AddMorningRoutine: function (e) {
      this.AddRoutine(e, '#RoutineMorningInput', '#AddRoutineLeft', 'morning');
    },

    AddNightRoutine: function (e) {
      this.AddRoutine(e, '#RoutineNightInput', '#AddRoutineRight', 'night');
    }

  });

}());

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
      task_list.ascending('createdAt');
      task_list.limit({
        success: function () {

        },
        error: function(error) {
          alert("Error: " + error.message);
        }
      });

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

(function () {

  App.Views.ParentViewRoutineNight = Parse.View.extend({

    tagName: 'ul',

    className: 'ParentViewRoutines2',

    events: {},

    template: _.template($('#parent-view-routines-night').html()),

    initialize: function (options) {
      this.options = options;

      // this.collection.off();
      this.collection.on('sync', this.taskQuery, this);

      $('#ListSection2').html(this.$el);

      this.taskQuery();
    },

    taskQuery: function () {
      var self = this;

      var task_list = new Parse.Query(App.Models.Routine);
      task_list.equalTo('user', App.user);
      task_list.ascending('createdAt');

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

(function () {

  App.Views.ParentEditRoutine = Parse.View.extend({

    tagName: 'ul',

    className: 'editRoutines',

    events: {
      'submit #edit-morning-list' : 'EditRoutine',
      'click #deleteMoTask' : 'DeleteTask'
    },

    template: _.template($('#parent-edit-routines').html()),

    initialize: function (options) {
      this.options = options;

      this.render();

      $('#ListSection').html(this.$el);
    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template(this.options.task.toJSON()));
    },

    EditRoutine: function (e) {
      e.preventDefault();

      this.options.task.set({
        routine: $('#edit_moro').val()
      });

      this.options.task.save();

      App.router.navigate('parent_routines', { trigger: true});
    },

    DeleteTask: function(e) {
      e.preventDefault();

      this.options.task.destroy();

      App.router.navigate('parent_routines', { trigger: true});
    }

  });

}());

(function () {

  App.Views.ParentEditRoutineNight = Parse.View.extend({

    tagName: 'ul',

    className: 'editRoutinesNight',

    events: {
      'submit #edit-night-list' : 'EditRoutineNight',
      'click #deleteNiTask' : 'DeleteTask'
    },

    template: _.template($('#parent-edit-routines-night').html()),

    initialize: function (options) {
      this.options = options;

      this.render();

      $('#ListSection2').html(this.$el);
    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template(this.options.task.toJSON()));
    },

    EditRoutineNight: function (e) {
      e.preventDefault();

      this.options.task.set({
        routine: $('#edit_moni').val()
      });

      this.options.task.save();

      App.router.navigate('parent_routines', { trigger: true});
    },

    DeleteTask: function(e) {
      e.preventDefault();

      this.options.task.destroy();

      App.router.navigate('parent_routines', { trigger: true});
    }

  });

}());

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

(function () {

  App.Views.ParentAddTime = Parse.View.extend({

    className: 'ParentTiming',

    events: {
      'submit #AddTimeLeft' : 'AddMorningTime',
      'submit #AddTimeRight' : 'AddNightTime'
    },

    template: _.template($('#parent-timing').html()),

    initialize: function () {
      $('#MainSection').html(this.$el);

      this.render();
    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template);

      $('#setTime').html(App.user.attributes.time_morning/60 + " Minutes");
      $('#setTimeNight').html(App.user.attributes.time_night/60 + " Minutes");
    },

    AddMorningTime: function (e) {
      e.preventDefault();

      var time_morning = parseInt($('#TimingMorningInput').val()*60);

      // console.log(time_morning);

      App.user.set('time_morning', time_morning);

      App.user.save();

      $('#setTime').html(time_morning/60 + " Minutes");
    },

    AddNightTime: function (e) {
      e.preventDefault();

      var time_night = parseInt($('#TimingNightInput').val()*60);

      App.user.set('time_night', time_night);

      App.user.save();

      $('#setTimeNight').html(time_night/60 + " Minutes");
    }

  });

}());

(function () {

  App.Views.ParentTimeView = Parse.View.extend({

    className: 'ParentViewTime',

    events: {},

    template: _.template($('#parent-view-time').html()),

    initialize: function (options) {
      this.options = options;

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

(function () {

  App.Views.ParentChartView = Parse.View.extend({

    className: 'ParentCharts',

    events: {},

    template: _.template($('#parent-charts').html()),

    initialize: function () {
      $('#MainSection').html(this.$el);

      this.render();
    },

    render: function () {
      this.$el.html(this.template);

      var chart = AmCharts.makeChart("chartdiv", {
          "type": "pie",
          "theme": "light",
          "dataProvider": [{
              "Task": "Eat Breakfast",
              "Seconds": 9.7
            }, {
              "Task": "Get Dressed",
              "Seconds": 8.4
            }, {
              "Task": "Brush Teeth",
              "Seconds": 4.7
            }, {
              "Task": "Comb Hair",
              "Seconds": 1.2
            }],
          "titleField": "Task",
          "valueField": "Seconds",
          "labelRadius": 5,

          "radius": "42%",
          "innerRadius": "50%",
          "labelText": "[[Task]]"
      });


    }

  });

}());

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

      $('#logOut, #ParentViewBtn').hide();

      $('.MainTitle, .phoneHome').click(function () {
        $('#logOut, #ParentViewBtn').show();
      });

      var timer_morning = App.user.attributes.time_morning;

      $('.start-button').click(function () {
        console.log(App.user.attributes.time_morning);
        App.clock = $('.your-clock').FlipClock(timer_morning, {
          countdown: true,
          clockFace: 'MinuteCounter',
          callbacks: {
            stop: function() {
              if( App.clock.time.time > 1 ) return;
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

      // App.counter=0;
      // App.timerStart = setInterval(function() {
      //   $('.timer').empty();
      //     App.counter++;
      //     console.log(App.counter);
      // }, 1000);

      $('.next-button').on('click', function(){
        clearInterval(App.timerStart);
        //console.log(App.timerStart);
      });

      $('.MainTitle, .phoneHome').click(function () {
        $('#logOut, #ParentViewBtn').show();
      });
    },

    nextChore: function (e) {
      e.preventDefault();

      clearInterval(App.timerStart);

      // Incrementing (bump) this.routine.
      this.routine = this.routine + 1;
      // Check if all routines are done. If this.routine == collection.length.
      if(this.routine === this.collection.length) {
        return App.router.navigate('routine_board', { trigger: true });
      } else {
        this.render_routine();
      }
      // If they are all done -> // Navigate/Redirect to "routine board" view.
      // Else -> // Re-render.

      // App.counter=0;
      // App.timerNext = setInterval(function() {
      //   $('.timer').empty();
      //     App.counter++;
      //     console.log(App.counter);
      // }, 1000);

      $('.next-button').on('click', function(){
        clearInterval(App.timerNext);
        //console.log(timer);
      });

      $('.MainTitle, .phoneHome').click(function () {
        $('#logOut, #ParentViewBtn').show();
      });
    }

  });

}());

(function () {

  App.Views.KidNightRoutine = Parse.View.extend({

    // tagName: 'ul',

    className: 'KidNightRoutines',

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

      $('#logOut, #ParentViewBtn').hide();

      $('.MainTitle, .phoneHome').click(function () {
        $('#logOut, #ParentViewBtn').show();
      });

      var timer_night = App.user.attributes.time_night;

      $('.start-button').click(function () {
        console.log(App.user.attributes.time_night);
        App.clock = $('.your-clock').FlipClock(timer_night, {
          countdown: true,
          clockFace: 'MinuteCounter',
          callbacks: {
            stop: function() {
              if( App.clock.time.time > 1 ) return;
              alert("Time's Up! You'll Do It Next Time");
              $('.your-clock').empty();
              App.router.navigate('routine_board', { trigger: true });
            }
          }
        });
      });

    },

    taskQuery: function () {
      var self = this;

      var task_list = new Parse.Query(App.Models.Routine);
      task_list.equalTo('user', App.user);
      task_list.equalTo('time_of_day', 'night');
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

      // App.counter=0;
      // App.timerStart = setInterval(function() {
      //   $('.timer').empty();
      //     App.counter++;
      //     console.log(App.counter);
      // }, 1000);

      $('.next-button').on('click', function(){
        clearInterval(App.timerStart);
        //console.log(App.timerStart);
      });

      $('.MainTitle, .phoneHome').click(function () {
        $('#logOut, #ParentViewBtn').show();
      });
    },

    nextChore: function (e) {
      e.preventDefault();

      clearInterval(App.timerStart);

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

      // App.counter=0;
      // App.timerNext = setInterval(function() {
      //   $('.timer').empty();
      //     App.counter++;
      //     console.log(App.counter);
      // }, 1000);

      $('.next-button').on('click', function(){
        clearInterval(App.timerNext);
        //console.log(timer);
      });

      $('.MainTitle, .phoneHome').click(function () {
        $('#logOut, #ParentViewBtn').show();
      });
    }

  });

}());

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

      // clearInterval(App.timerNext);

      App.clock.stop();

      this.$el.html(this.template);

      var start = (new Date().getDay());

      switch(start) {
        case 0:
          $('#starSun').html('<img src=' + App.user.attributes.daily_display + '/>');
          break;
        case 1:
          $('#starMon').html('<img src=' + App.user.attributes.daily_display + '/>');
          break;
        case 2:
          $('#starTue').html('<img src=' + App.user.attributes.daily_display + '/>');
          break;
        case 3:
          $('#starWed').html('<img src=' + App.user.attributes.daily_display + '/>');
          break;
        case 4:
          $('#starThu').html('<img src=' + App.user.attributes.daily_display + '/>');
          break;
        case 5:
          $('#starFri').html('<img src=' + App.user.attributes.daily_display + '/>');
          break;
        case 6:
          $('#starSat').html('<img src=' + App.user.attributes.daily_display + '/>');
          break;
      }

      var reward_weekly = App.user.attributes.weekly_reward;
      // console.log(reward_weekly);
      $('#reward').html(App.user.attributes.weekly_reward);

    }

  });

}());

Parse.initialize("FjJjRl8DU1m2DZy1BQiTuLhajPHq6AXtEESyV6EY", "AhntxdGEcM6rckjx6Q0jjAgJq0HHKbcJEnkfbak9");

(function () {

  //instance of collection
  App.tasks = new App.Collections.Routines();
  App.times = new App.Collections.Times();

  //server fetch
  App.tasks.fetch().done( function (){

    App.router = new App.Routers.AppRouter();
    Parse.history.start();

  });

  App.times.fetch().done( function (){

    App.router = new App.Routers.AppRouter();

  });

  // Log Out
  $('#logOut').on('click', function (e) {
    e.preventDefault();

    Parse.User.logOut();
    App.updateUser();
    App.router.navigate('login', {trigger: true});
  });

  // Update User
  App.updateUser = function (){
    App.user = Parse.User.current();
    var currUsr;
    if (App.user == null){
      currUsr = '';
      $('#logOut').text('Log In');
    } else {
      currUsr = '<img src=' + App.user.attributes.avatar + '/>' + 'Hey ' + App.user.attributes.username + '!';
      $('#logOut').text('Log Out');
    }
    $('#loggedIn').html(currUsr);
  };
  App.updateUser();

  $('#copter').hover( function () {
  $(this).toggleClass('animated bounceOutRight')
});


$('.ParRoMP').hover( function () {
  $('#floatingImage').toggleClass('animated flip')
});

}());
