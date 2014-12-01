(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    routes: {

      '' : 'home',
      'signup' : 'userSignUp'

    },

    // home: function (){
    //   new App.Views.PublicPost({ collection: App.posts });
    // },

    userSignUp: function () {
      if(App.user) return App.router.navigate('', { trigger: true});

      new App.Views.SignUpView();

    }

  });

}());
