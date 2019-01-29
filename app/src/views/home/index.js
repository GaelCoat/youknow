var tpl = require("pug-loader!./tpl.pug");
var Appear = require("../../libs/appear");
var Projects = require("./projects");

module.exports = Marionette.View.extend({

  id: 'home',

  events: {
  },

  currentId: 0,
  maxId: null,

  initCarousel: function() {

    var that = this;
    var Carousel = this.$el.find('.carousel');

    var next = this.$el.find('section[data-id='+this.currentId+']');
    next.show();

    _.delay(function() {

      next.addClass('current');
      next.find('img').attr('src', next.find('img').attr('to-load'));
      that.handleTimer(next);
    }, 500);
  },

  next: function() {

    this.currentId += 1;

    if (this.currentId > this.maxId) this.currentId = 0;

    return this.slideTo(this.currentId);
  },

  slideTo: function(id) {

    var that = this;
    var current = this.$el.find('section.current');
    var next = this.$el.find('section[data-id='+id+']');

    current.removeClass('current');

    _.delay(function() { 

      current.hide();
      next.show();
    }, 500);

    _.delay(function() {

      that.currentId = id;
      next.addClass('current');
      next.find('img').attr('src', next.find('img').attr('to-load'));

      that.handleTimer(next);
    }, 900);

    return this;
  },

  handleTimer: function(item) {

    var timer = item.find('.timer');
    var color = timer.data('color');
    var that = this;

    timer
      .css({ left: 0, right: 'auto', background: color })
      .delay(2000)
      .animate({ width: '100%' }, 6000, 'linear', function() {
      
        timer
          .css({ left: 'auto', right: 0 })
          .animate({ width: '0%' }, 1000, that.next.bind(that));
      });
  },

  renderProjects: function() {

    var that = this;
    var tpl = $('#tpl-project').html();

    this.maxId = Projects.length - 1;

    Projects.forEach(function(project, id) {

      var html = _.template(tpl)({
        project: project,
        id: id
      });

      that.$el.find('.carousel').append(html);
    })
    
    return this.initCarousel();
  },

  render: function() {

    var that = this;

    return q.fcall(function() {

      var html = tpl();
      var template = _.template(html);

      that.$el.html(template())

      return that.renderProjects();
    })
    .catch(function(err) {
      console.log(err);
    })
  }

});
