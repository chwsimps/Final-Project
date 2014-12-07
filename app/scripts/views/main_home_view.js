(function () {

  App.Views.MainHomeView = Parse.View.extend({

    className: 'MainHome',

    events: {},

    initialize: function () {
      this.render();

    },

    render: function () {

      // // Get Cookie
      // var color = $.cookie('color');
      //
      // // Cookie Exists
      // if (color){
      //     $('body').addClass(color);
      // }
      // // Cookie Doesn't Exist
      // else {
      //     $('body').addClass('blue');
      // }

      $('.MorningRoutineMP').click( function () {

        $('body').addClass('sunrise');
        // $.cookie('background-color','red');
        $('.UserHeader').empty();

      });

    }

  });

}());
