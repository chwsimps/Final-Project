Parse.initialize("FjJjRl8DU1m2DZy1BQiTuLhajPHq6AXtEESyV6EY", "AhntxdGEcM6rckjx6Q0jjAgJq0HHKbcJEnkfbak9");

(function () {

  //instance of collection
  App.tasks = new App.Collections.Routines();

  //server fetch
  App.tasks.fetch().done( function (){

    App.router = new App.Routers.AppRouter();
    Parse.history.start();

  });


}());
