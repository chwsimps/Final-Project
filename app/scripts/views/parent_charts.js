(function () {

  App.Views.ParentChartView = Parse.View.extend({

    className: 'ParentCharts',

    events: {},

    template: _.template($('#parent-charts').html()),

    initialize: function () {
      $('#MainSection').html(this.$el);

      this.render();
    },

    render: function () {
      this.$el.html(this.template);

      var chart = AmCharts.makeChart("chartdiv", {
          "type": "pie",
          "theme": "light",
          "dataProvider": [{
              "Task": "Eat Breakfast",
              "Seconds": 9.7
            }, {
              "Task": "Get Dressed",
              "Seconds": 8.4
            }, {
              "Task": "Brush Teeth",
              "Seconds": 4.7
            }, {
              "Task": "Comb Hair",
              "Seconds": 1.2
            }],
          "titleField": "Task",
          "valueField": "Seconds",
          "labelRadius": 5,

          "radius": "42%",
          "innerRadius": "50%",
          "labelText": "[[Task]]"
      });


    }

  });

}());
