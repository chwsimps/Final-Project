(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    routes: {

      '' : 'home',
      'signup' : 'userSignUp',
      'login' : 'userLogin'

    },

    // home: function (){
    //   new App.Views.PublicPost({ collection: App.posts });
    // },

    userSignUp: function () {
      if(App.user) return App.router.navigate('', { trigger: true});

      new App.Views.SignUpView();

    },

    userLogin: function () {
      if(App.user) return App.router.navigate('', { trigger: true});

      new App.Views.LoginView();
    }

  });

}());
