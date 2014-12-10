(function () {

  App.Views.ParentChartView = Parse.View.extend({

    className: 'ParentCharts',

    events: {},

    template: _.template($('#parent-charts').html()),

    initialize: function () {
      this.render();

      $('#MainSection').html(this.$el);
    },

    render: function () {

      var chart = AmCharts.makeChart("chartdiv", {
          "type": "pie",
          "theme": "light",
          "dataProvider": [{
              "Task": "Eat Breakfast",
              "Seconds": 582
            }, {
              "Task": "Get Dressed",
              "Seconds": 369
            }, {
              "Task": "Brush Teeth",
              "Seconds": 423
            }, {
              "Task": "Pick Out Snack",
              "Seconds": 45
            }],
          "titleField": "Task",
          "valueField": "Seconds",
          "labelRadius": 5,

          "radius": "42%",
          "innerRadius": "60%",
          "labelText": "[[Task]]"
      });

      this.$el.html(this.template);


    }

  });

}());
