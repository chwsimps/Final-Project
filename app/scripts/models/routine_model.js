(function () {

  App.Models.Routine = Parse.Object.extend({

    className: 'Routine',
    idAttribute: 'objectId',

    defaults: {
      morning_routine: '',
      night_routine: '',
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
