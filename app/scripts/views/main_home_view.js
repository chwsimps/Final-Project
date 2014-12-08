(function () {

  App.Views.MainHomeView = Parse.View.extend({

    className: 'MainHome',

    events: {},

    initialize: function () {
      this.render();

    },

    render: function () {

      $('.MorningRoutineMP').click( function () {

        $('body').addClass('sunrise');
        // $.cookie('background-color','red');
        $('.UserHeader').empty();

      });

    }

  });

}());
