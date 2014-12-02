(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    routes: {

      '' : 'home',
      'signup' : 'userSignUp',
      'login' : 'userLogin',
      'parent' : 'parentMain',
      'parent_routines' : 'AddRoutine',
      'parent_rewards' : 'AddRewards',
      'parent_timing' : 'AddTimeSetUp'
    },

    home: function (){
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
      new App.Views.ParentViewRoutine2({ collection: App.tasks });
    },

      AddRewards: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.ParentRewardView();
    },

    AddTimeSetUp: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.ParentTimingView();
    }

  });

}());
