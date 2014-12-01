(function () {

  App.Views.ParentHomeView = Parse.View.extend({

    className: 'ParentHome',

    events: {
      
    },

    template: _.template($('#parent-mainPage').html()),

    initialize: function () {
      this.render();

      $('#MainSection').html(this.$el);
    },

    render: function () {
      this.$el.html(this.template);
    }

  });

}());
