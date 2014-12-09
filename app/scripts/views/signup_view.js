(function () {

  App.Views.SignUpView = Parse.View.extend({

    className: 'signingUp',

    events: {
      'submit #SignUp' : 'userSignUp'
    },

    template: _.template($('#user-signup').html()),

    initialize: function () {
      this.render();

      $('#LoginSection').html(this.$el);
    },

    render: function () {
      this.$el.html(this.template);
    },

    userSignUp: function (e) {
      e.preventDefault();

    var user = new Parse.User({
      username: $("#signupName").val(),
      password: $("#signupPassword").val(),
      avatar: $("#userAvatar").val(),
      email: $("#signupEmail").val(),
      time_morning: 1800,
      time_night: 1800,
      daily_display: '★',
      daily_reward: 'Add Daily Reward',
      weekly_reward: 'Add Weekly Reward'
      });

      // user.signUp();

      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
          App.updateUser();
          App.router.navigate('', { trigger: true });
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.message);
        }
      });

      $('#LoginSection').empty();
    }

  });

}());
