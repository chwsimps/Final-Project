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
      'edit_morning/:taskID' : 'EditRoutine',
      'edit_night/:taskID' : 'EditRoutineNight',
      'morning_routines' : 'RunMorningRoutines',
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

      new App.Views.ParentTimeView({ collection: App.times });
      new App.Views.ParentTimeViewNight({ collection: App.times });
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

      new App.Views.KidMorningRoutine({ collection: App.times });
    },

    DisplayRoutineBoard: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.KidRoutineBoard();
    }

  });

}());
