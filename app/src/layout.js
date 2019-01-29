var req = require.context("./", true, /\.js$/);

module.exports = Marionette.View.extend({

  el: 'body',

  regions: {
    content: "main",
  },

  events: {
    'click a[soft]': 'handleRedirect',
    'click .anchor': 'anchor',
  },

  loaded: false,

  initialize: function() {

    $(document).scroll(function(e) {

      Backbone.trigger('window:scroll', e);
    });
  },

  handleRedirect: function(e) {

    var href = $(e.currentTarget).attr('href');
    var protocol = this.protocol + '//';

    if (href.slice(protocol.length) !== protocol) {
      e.preventDefault();
      this.trigger('redirect', href)
    }

    return this;
  },


  loadView: function(path, params) {

    var that = this;

    return q.fcall(function() {

      if (!that.loaded) return that.wait(path, params);
      return that;
    })
    .then(function() {

      var ItemView = req('./views/'+path+'.js');
      var view = new ItemView(params);

      that.getRegion('content').show(view);
      return that;
    })
  },

  wait: function(path, params) {

    var that = this;

    return q.fcall(function() {


      // Preload GIFS
      // Preload GIFS
      // Preload GIFS
      // Preload GIFS
      // Preload GIFS
      // Preload GIFS
      // Preload GIFS
      return that.loaded = true;
    })
    .delay(4000)
    .then(function() {

      return that.$el.find('#loader').fadeOut();
    })
    .delay(500)
    .then(function() {

      that.$el.addClass('loaded');
      return that.loadView(path, params)
    })


  },

  render: function() {

    return this;
  },


});
