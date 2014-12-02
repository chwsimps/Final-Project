(function () {

  App.Models.Routine = Parse.Object.extend({

    className: 'Routine',
    idAttribute: 'objectId',

    defaults: {
      time_of_day: '',
      routine: '',
      reward_daily: '',
      reward_weekly: '',
      reward_monthly: '',
      timing: '',
      user: ''
    },

    initialize: function (){

    }

  });

}());
