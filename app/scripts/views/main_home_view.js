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

      $('#logOut, #ParentViewBtn, #loggedIn').show();
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
