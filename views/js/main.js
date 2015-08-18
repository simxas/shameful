//my helpers====================================
//jquery function to put form data in to object. 
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
getting enums.json with simple jquery function
an adding to variable enums.
*/
var enums;
$.getJSON("enums.json", function(result){
        enums = result.itemEnums;
});
// ==============================================
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
