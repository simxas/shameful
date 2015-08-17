var itemWithData;
var enumsWithData;
//====================================
var Item = Backbone.Model.extend({
	defaults: {
        id: 123,
        title: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        dealerInternalNotes: "none available",
        material: {
        	description: "Ceramic",
            restricted: "N"
        },
        measurement: {
			unit: "in",
			shape: "",
			length: "4.5",
			depth: "4.5",
			height: "12"
        },
        condition: {
            description: "Good"
        }
    }

});
var item = new Item();
item.url = '/item.json';
var enums = new Item();
enums.url = '/enums.json';


var FormView = Backbone.View.extend({
	el: '.page',
	initialize: function() {
			this.template = _.template($('#formTemplate').html());
			this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		item.fetch({
			success: function(data){
			data.toJSON();
			itemWithData = data.attributes.result.item;
			var template = _.template($('#formTemplate').html(), {data:itemWithData});
			$('.page').html(template());
			}
		});
		enums.fetch({
			success: function(data){
			data.toJSON();
			enumsWithData = data.attributes.itemEnums;
			var template = _.template($('#formTemplate').html(), {data:enumsWithData});
			$('.page').html(template());
			}
		});
		
	}//end of render
});

var Router = Backbone.Router.extend({
	routes: {
		'': 'home'
	}
});

var formView = new FormView();
var router = new Router();


router.on('route:home', function() {
	formView.render();

});//end of router on


Backbone.history.start();