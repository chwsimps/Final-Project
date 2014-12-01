(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    routes: {

      '' : 'home',
      'signup' : 'userSignUp',
      'login' : 'userLogin',
      'parent' : 'parentMain',
      'parent_routines' : 'AddMorningRoutine',
      'parent_routines' : 'AddNightRoutine'
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

    AddMorningRoutine: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.ParentAddRoutine();

      new App.Views.ParentViewRoutine({ collection: App.tasks });
    },

    AddNightRoutine: function () {
      if(!App.user) return App.router.navigate('login', { trigger: true});

      new App.Views.ParentAddRoutine();

      new App.Views.ParentViewRoutine({ collection: App.tasks });
    },

  });

}());
