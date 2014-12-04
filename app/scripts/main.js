Parse.initialize("FjJjRl8DU1m2DZy1BQiTuLhajPHq6AXtEESyV6EY", "AhntxdGEcM6rckjx6Q0jjAgJq0HHKbcJEnkfbak9");

(function () {

  //instance of collection
  App.tasks = new App.Collections.Routines();

  //server fetch
  App.tasks.fetch().done( function (){

    App.router = new App.Routers.AppRouter();
    Parse.history.start();

  });

  // Log Out
  $('#logOut').on('click', function (e) {
    e.preventDefault();

    Parse.User.logOut();
    App.updateUser();
    App.router.navigate('login', {trigger: true});
  });

  // Update User
  App.updateUser = function (){
    App.user = Parse.User.current();
    var currUsr;
    if (App.user == null){
      currUsr = '';
      $('#logOut').text('Log In');
    } else {
      currUsr = 'Welcome ' + App.user.attributes.username;
      $('#logOut').text('Log Out');
    }
    $('#loggedIn').html(currUsr);
  };
  App.updateUser();


}());
