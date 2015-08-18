// ====================
// My helper functions
//=====================
//jquery function to serialize form data in to object. 
$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};

/*
getting enums.json with simple ajax function
an adding file's content to variable enums.
*/
var enums; 
$.ajax({
  url: 'enums.json',
  async: false,
  dataType: 'json',
  success: function (response) {
    enums = response.itemEnums;
  }
});

//===========
//Models
//===========
var Item = Backbone.Model.extend({
    url: '/item.json',
    defaults: {
        id: 123,
        title: "",
        description: "",
        dealerInternalNotes: "",
        material: {
            description: "",
            restricted: ""
        },
        measurement: {
            unit: "",
            shape: "",
            length: "",
            depth: "",
            height: "",
            diameter: ""
        },
        condition: {
            description: ""
        }
    }
});

var item = new Item();

//=========
//Views
//=========
var FormView = Backbone.View.extend({
    el: '.page',
    render: function() {

        var that = this;
        item.fetch({
            success: function(item) {
                var result = item.attributes.result.item;
                var template = _.template($("#formTemplate").html(), result);
                that.$el.html(template);
                //appending second template to the first one as a child template
                var second = new SecondPartView();
                $('#secondPart', this.$el).append(second.$el);

            }
        });

    },//end of render
    events: {
        'submit .form': 'saveInfo'
    },
    saveInfo: function(ev) {
        var itemDetails = $(ev.currentTarget).serializeObject();
        var newItem = new Item();
        newItem.set(itemDetails);
        console.log(newItem.attributes);
        
        return false;
    }
});

var SecondPartView = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    render: function() {
        var template = _.template($("#secondTemplate").html());
        this.$el.html(template);
    }
});

//=============
//Routes
//=============
var Router = Backbone.Router.extend({
    routes: {
        '': 'home'
    }
});

var router = new Router();
router.on('route:home', function() {
    var formView = new FormView();
    formView.render();
});
Backbone.history.start();
