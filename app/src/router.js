
module.exports = Backbone.Router.extend({

  routes: {
    '': 'home',
    ':id': 'page',
  },

  home: function() { return this.render('home/index') },
  page: function(id) { return this.render(id+'/index') },

  render: function(view, params) {

    this.trigger('router:render', {view: view, params: params});
    return this;
  }
});
