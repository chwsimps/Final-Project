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
