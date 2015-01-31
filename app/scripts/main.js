Parse.initialize("FjJjRl8DU1m2DZy1BQiTuLhajPHq6AXtEESyV6EY", "AhntxdGEcM6rckjx6Q0jjAgJq0HHKbcJEnkfbak9");

(function () {

  //instance of collection
  App.tasks = new App.Collections.Routines();
  App.times = new App.Collections.Times();

  //server fetch
  App.tasks.fetch().done( function (){

    App.router = new App.Routers.AppRouter();
    Parse.history.start();

  });

  App.times.fetch().done( function (){

    App.router = new App.Routers.AppRouter();

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
    if (App.user == null) {
      App.currUsr = '';
      $('#logOut').text('Log In');
      $('#loggedIn').hide();
    } else {
      currUsr = '<img src=' + App.user.attributes.avatar + '/>' + 'Hey ' + App.user.attributes.username + '!';
    $('#logOut').html('<span class="logOutBtn">Log Out</span>' + '<img class="lock" src="images/lock.png" />');
    }
    $('#loggedIn').html(currUsr);
  };
  App.updateUser();

  $('.ParRoMP').hover( function () {
    $('#floatingImage').toggleClass('animated flip')
  });

}());
