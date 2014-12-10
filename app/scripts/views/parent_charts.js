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

      this.$el.html(this.template);
    }

  });

}());
