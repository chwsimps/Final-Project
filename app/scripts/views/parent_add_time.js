(function () {

  App.Views.ParentAddTime = Parse.View.extend({

    className: 'ParentTiming',

    events: {
      'submit #AddTimeLeft' : 'AddMorningTime',
      'submit #AddTimeRight' : 'AddNightTime'
    },

    template: _.template($('#parent-timing').html()),

    initialize: function () {

      $('#MainSection').html(this.$el);

      this.render();



    },

    render: function () {
      this.$el.empty();

      this.$el.html(this.template);

      $('#setTime').html(App.user.attributes.time_morning);


    },

    // AddTime: function (e) {
    //   e.preventDefault();
    //
    //   App.user.save({
    //     time_morning: parseInt($('#TimingMorningInput').val()*60),
    //     time_night: parseInt($('#TimingNightInput').val()*60),
    //   });

      // at = new App.Models.Time({
      //   timing: parseInt($(input_id).val()*60),
      //   time_of_day: tod,
      //   user: App.user
      // });
      //
      // // $(input_id).hide();
      //
      // at.setACL(new Parse.ACL(App.user));
      //
      // at.save(null, {
      //   success: function () {
      //     App.times.add(at);
      //     App.router.navigate('parent_timing', { trigger: true });
      //   },
      //   error: function (obj, e) {
      //     console.log('Shit went wrong! ' + e.message);
      //   }
      // });

      //
      // location.reload();

    // },

    AddMorningTime: function (e) {
      e.preventDefault();

      var time_morning = parseInt($('#TimingMorningInput').val()*60);

      console.log(time_morning);

      App.user.set('time_morning', time_morning);

      App.user.save();

      // var test1 = App.user.attributes.time_morning;
      $('#setTime').html(time_morning);
      // console.log(App.user.attributes.time_morning);



      $('#AddMorningTime').text('Locked In');
    },

    AddNightTime: function (e) {
      e.preventDefault();

      App.user.save({
        time_night: parseInt($('#TimingNightInput').val()*60)
      });

      $('#setTimeNight').html(App.user.attributes.time_night / 60 + ' Minutes');

      $('#AddNightTime').text('Locked In');
    }

  });

}());
